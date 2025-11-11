using AMI_ProjectAPI.Data;
using AMI_ProjectAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AMI_ProjectAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BillReadingController : ControllerBase
    {
        private readonly AmiContext _context;

        public BillReadingController(AmiContext context)
        {
            _context = context;
        }

        // GET all bills
        [HttpGet("AllBills")]
        public async Task<IActionResult> GetAllBills()
        {
            var bills = await _context.BillReadings
                .OrderByDescending(b => b.BillingMonth)
                .ToListAsync();
            return Ok(bills);
        }

        // GET bills by Customer
        [HttpGet("ByCustomer/{consumerId}")]
        public async Task<IActionResult> GetBillsByCustomer(int consumerId)
        {
            var bills = await _context.BillReadings
                .Where(b => b.ConsumerId == consumerId)
                .OrderByDescending(b => b.BillingMonth)
                .ToListAsync();

            if (!bills.Any())
                return NotFound($"No bills found for consumer {consumerId}");

            return Ok(bills);
        }

        // Generate or return bills for a month (YYYY-MM)
        [HttpGet("Month/{month}")]
        public async Task<IActionResult> GetOrGenerateBillsForMonth(string month)
        {
            // validate month
            if (!DateTime.TryParse($"{month}-01", out DateTime parsedMonth))
                return BadRequest("Invalid month format. Use 'YYYY-MM' (e.g., 2025-11).");

            int selectedYear = parsedMonth.Year;
            int selectedMonth = parsedMonth.Month;
            string billingMonthKey = $"{selectedYear}-{selectedMonth:D2}";

            // Step 1: Compute monthly consumption per meter as Max(reading) - Min(reading)
            var meterConsumptions = await (
                from mr in _context.MeterReadings
                join m in _context.Meters on mr.MeterId equals m.MeterId
                join c in _context.Consumers on m.ConsumerId equals c.ConsumerId
                join t in _context.Tariffs on c.TariffId equals t.TariffId
                where mr.ReadingDate.Month == selectedMonth && mr.ReadingDate.Year == selectedYear
                group mr by new
                {
                    c.ConsumerId,
                    mr.MeterId,
                    t.TariffId,
                    t.Name,
                    t.BaseRate,
                    t.TaxRate
                } into g
                select new
                {
                    g.Key.ConsumerId,
                    g.Key.MeterId,
                    g.Key.TariffId,
                    g.Key.Name,
                    g.Key.BaseRate,
                    g.Key.TaxRate,
                    BillingMonth = billingMonthKey,
                    TotalConsumption = g.Max(r => r.ReadingValue) - g.Min(r => r.ReadingValue)
                }).ToListAsync();

            if (!meterConsumptions.Any())
                return NotFound("No meter readings available for this month.");

            // Step 2: Fetch existing bills for that month into dictionary (consumer,meter) -> bill
            var existingBills = await _context.BillReadings
                .Where(b => b.BillingMonth == billingMonthKey)
                .ToListAsync();

            var existingBillMap = existingBills.ToDictionary(b => (b.ConsumerId, b.MeterId), b => b);

            // Step 3: Pre-fetch slabs for involved tariffs to avoid repeated DB calls
            var tariffIds = meterConsumptions.Select(x => x.TariffId).Distinct().ToList();
            var slabs = await _context.TariffSlabs
                .Where(s => tariffIds.Contains(s.TariffId))
                .OrderBy(s => s.FromKwh)
                .ToListAsync();

            // Create map: tariffId -> ordered slab list
            var slabsByTariff = slabs
                .GroupBy(s => s.TariffId)
                .ToDictionary(g => g.Key, g => g.OrderBy(s => s.FromKwh).ToList());

            List<BillReading> toUpsert = new();

            foreach (var r in meterConsumptions)
            {
                decimal totalConsumption = Math.Max(0, r.TotalConsumption); // avoid negatives
                decimal energyCharge = 0m;

                // Get slabs for tariff; if none exist, we treat energyCharge = baseRate (or you may choose fallback rate)
                if (slabsByTariff.TryGetValue(r.TariffId, out var tariffSlabs) && tariffSlabs.Any())
                {
                    // robust slab calculation (units in each slab = max(0, min(total, To) - From) )
                    foreach (var slab in tariffSlabs)
                    {
                        // ensure slab.ToKwh > slab.FromKwh
                        decimal from = slab.FromKwh;
                        decimal to = slab.ToKwh;

                        if (to <= from) continue; // skip invalid slab

                        var units = Math.Max(0m, Math.Min(totalConsumption, to) - from);
                        if (units <= 0) continue;

                        energyCharge += units * slab.RatePerKwh;
                    }
                }
                // add base rate for tariff (flat fixed component)
                energyCharge += r.BaseRate;

                // TaxRate: handle if stored as percent (e.g., 18) or fraction (0.18)
                decimal taxRate = r.TaxRate;
                if (taxRate > 1) taxRate = taxRate / 100m;

                decimal taxAmount = Math.Round(energyCharge * taxRate, 2);
                decimal totalBill = Math.Round(energyCharge + taxAmount, 2);

                // Upsert logic
                if (existingBillMap.TryGetValue((r.ConsumerId, r.MeterId), out var existing))
                {
                    // update only if values differ (so we avoid unnecessary writes)
                    if (existing.TotalConsumption != totalConsumption
                        || existing.EnergyCharge != Math.Round(energyCharge, 2)
                        || existing.TotalBill != totalBill)
                    {
                        existing.TotalConsumption = totalConsumption;
                        existing.EnergyCharge = Math.Round(energyCharge, 2);
                        existing.TaxAmount = taxAmount;
                        existing.TotalBill = totalBill;
                        existing.GeneratedDate = DateTime.UtcNow;
                        toUpsert.Add(existing);
                    }
                }
                else
                {
                    var newBill = new BillReading
                    {
                        ConsumerId = r.ConsumerId,
                        MeterId = r.MeterId,
                        TariffId = r.TariffId,
                        BillingMonth = r.BillingMonth,
                        TariffType = r.Name,
                        TotalConsumption = totalConsumption,
                        EnergyCharge = Math.Round(energyCharge, 2),
                        TaxAmount = taxAmount,
                        TotalBill = totalBill,
                        Status = "Unpaid",
                        GeneratedDate = DateTime.UtcNow
                    };
                    toUpsert.Add(newBill);
                }
            }

            // Step 4: Save changes (insert new and update existing)
            if (toUpsert.Any())
            {
                foreach (var b in toUpsert)
                {
                    if (b.BillId == 0)
                        _context.BillReadings.Add(b);
                    else
                        _context.BillReadings.Update(b);
                }
                await _context.SaveChangesAsync();
            }

            // Step 5: Return all bills for that month
            var finalBills = await _context.BillReadings
                .Where(b => b.BillingMonth == billingMonthKey)
                .ToListAsync();

            return Ok(new
            {
                Message = toUpsert.Any()
                    ? $"✅ {toUpsert.Count} bills generated/updated for {billingMonthKey}"
                    : $"⚙️ All bills for {billingMonthKey} are already up-to-date",
                Bills = finalBills
            });
        }

        // GET bills for specific customer and month
        [HttpGet("ByCustomer/{consumerId}/{month}")]
        public async Task<IActionResult> GetBillByCustomerAndMonth(int consumerId, string month)
        {
            if (!DateTime.TryParse($"{month}-01", out DateTime parsedMonth))
                return BadRequest("Invalid month format. Use 'YYYY-MM'.");

            var billingMonthKey = $"{parsedMonth.Year}-{parsedMonth.Month:D2}";

            var bill = await _context.BillReadings
                .Where(b => b.ConsumerId == consumerId && b.BillingMonth == billingMonthKey)
                .ToListAsync();

            if (!bill.Any())
                return NotFound($"No bill found for customer {consumerId} in {billingMonthKey}");

            return Ok(bill);
        }

        [HttpPut("PayBill/{billId}")]
        public async Task<IActionResult> PayBill(int billId, [FromBody] BillPaymentDTO payment)
        {
            var bill = await _context.BillReadings.FindAsync(billId);
            if (bill == null)
                return NotFound("Bill not found");

            if (bill.Status == "Paid")
                return BadRequest("Bill already paid");

            if (payment.AmountPaid <= 0)
                return BadRequest("Invalid payment amount");

            // ✅ Handle payment
            bill.AmountPaid = payment.AmountPaid;
            bill.PaymentMode = payment.PaymentMode;
            bill.PaymentDate = payment.PaymentDate;
            if(bill.RemainingBalance == null)
                bill.RemainingBalance = bill.TotalBill;
            bill.RemainingBalance -= payment.AmountPaid;

            bill.Status = bill.RemainingBalance <= 0 ? "Paid" : "Partially Paid";

            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "Payment processed successfully.",
                remainingBalance = bill.RemainingBalance
            });
        }


    }
}
