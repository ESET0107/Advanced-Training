using AMI_ProjectAPI.Data;
using AMI_ProjectAPI.Data.Repository;
using AMI_ProjectAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AMI_ProjectAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MeterReadingController : ControllerBase
    {
        private readonly IGenericRepository<MeterReading> _meterReadingRepo;
        private readonly IGenericRepository<Meter> _meterRepo; // ✅ Add this line

        // ✅ Updated constructor to inject both repositories
        public MeterReadingController(
            IGenericRepository<MeterReading> meterReadingRepo,
            IGenericRepository<Meter> meterRepo)
        {
            _meterReadingRepo = meterReadingRepo;
            _meterRepo = meterRepo;
        }

        [HttpGet("AllMeterReadings")]

        public async Task<IActionResult> GetAllMeterReadings()
        {
            var values = await _meterReadingRepo.GetAllAsync();
            return Ok(values);
        }

        [HttpGet("MeterReadings/{id}")]

        public async Task<IActionResult> GetMeterReadingById(int id)
        {
            var val = await _meterReadingRepo.GetByIdAsync(id);
            if (val == null)
            {
                return NotFound();
            }
            return Ok(val);
        }
        [HttpGet("ByCustomer/{customerId}")]
        public async Task<IActionResult> GetReadingsByCustomer(int customerId)
        {
            // ✅ Step 1: Get all meters for this customer
            var allMeters = await _meterRepo.GetAllAsync();
            var customerMeterIds = allMeters
                .Where(m => m.ConsumerId == customerId)
                .Select(m => m.MeterId)
                .ToList();

            if (!customerMeterIds.Any())
                return NotFound(new { message = "No meters found for this customer." });

            // ✅ Step 2: Get readings that match these meter IDs
            var allReadings = await _meterReadingRepo.GetAllAsync();
            var readings = allReadings
                .Where(r => customerMeterIds.Contains(r.MeterId))
                .OrderByDescending(r => r.ReadingDate)
                .ToList();

            if (!readings.Any())
                return NotFound(new { message = "No readings found for this customer's meters." });

            return Ok(readings);
        }
        [HttpPost("addMeterReadings")]
        public async Task<IActionResult> AddMeterReadings([FromBody] MeterReadingDTO meterReadings)
        {
            var NewmeterReading = new MeterReading
            {
                ReadingId = meterReadings.ReadingId,
                MeterId = meterReadings.MeterId,
                ReadingValue = meterReadings.ReadingValue,
                ReadingDate = meterReadings.ReadingDate,
                CreatedAt = meterReadings.CreatedAt

            };
            await _meterReadingRepo.AddAsync(NewmeterReading);
            return CreatedAtAction(nameof(GetMeterReadingById), new { id = meterReadings.ReadingId }, meterReadings);
        }

        [HttpPut("UpdateMeterReadings/{id}")]
        public async Task<IActionResult> UpdateMeterReadings(int id, [FromBody] MeterReadingDTO meterReadings)
        {
            if (id != meterReadings.ReadingId)
            {
                return BadRequest();
            }
            var updatedMeterreading = new MeterReading
            {
                ReadingId = id,
                MeterId = meterReadings.MeterId,
                ReadingValue = meterReadings.ReadingValue,
                ReadingDate = meterReadings.ReadingDate,
                CreatedAt = meterReadings.CreatedAt

            };
            await _meterReadingRepo.UpdateAsync(updatedMeterreading);
            return NoContent();
        }

        [HttpDelete("DeleteMeterReading/{id}")]
        public async Task<IActionResult> DeleteMeter(int id)
        {
            await _meterReadingRepo.DeleteAsync(id);
            return NoContent();
        }
    }
}