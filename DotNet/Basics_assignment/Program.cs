using System.Diagnostics.Metrics;

namespace Basics_assignment
{
    internal class Program
    {
        static void Main(string[] args)
        {
            //1.001 - Quick Bill from Two Readings
            string meterSerial = "AP-000123";
            int prevReading = 12500;
            int currReading = 12620;
            int units = currReading - prevReading;
            if (units <= 0)
            {
                Console.WriteLine("Invalid readings");
            }
            else
            {
                double energyCharge = units * 6.5;
                double tax = energyCharge * 0.05;
                double total = energyCharge + tax;
                Console.WriteLine($"Meter  {meterSerial} | Units : {units} | Energy : {energyCharge.ToString("F2")} | Tax(5%) : {tax.ToString("F2")} | Total : {total.ToString("F2")} ");
            }
            Console.WriteLine("--------------------------------------------------");

            //2.002 - Weekly Consumption Basics
            int[] daily = { 4, 5, 6, 0, 7, 8, 5 };
            int totalSum = daily.Sum();
            double avg = daily.Average();
            int max = daily.Max();
            int max_index = Array.IndexOf(daily, max) + 1;
            int outages = daily.Count(d => d == 0);
            Console.WriteLine($"Total : {totalSum} kWh | Average : {avg} kWh | Max : {max} kWh (Day {max_index}) | Outages : {outages}");
            Console.WriteLine("--------------------------------------------------");

            //2.003 - Parse Load Profile Lines (No Files)
            string[] lines = { "2025-09-01,4.2,OK", "2025-09-02,5.0,OK", "2025-09-03,0.0,OUTAGE", "2025-09-04,3.8,OK", "2025-09-05,6.1,OK", "2025-09-06,2.5,TAMPER", "2025-09-07,5.4,OK" };
            double OK_sum = 0;
            int outage_count = 0;
            int tamper_count = 0;
            foreach (string line in lines)
            {
                string[] parts = line.Split(',');
                string date = parts[0];
                double consumption = double.Parse(parts[1]);
                string status = parts[2];
                if (status == "OK")
                {
                    OK_sum += consumption;
                }
                else if (status == "OUTAGE")
                {
                    outage_count++;
                }
                else if (status == "TAMPER")
                {
                    tamper_count++;
                }
            }
            double OK_avg = OK_sum / (lines.Length - outage_count - tamper_count);
            Console.WriteLine($"OK : {OK_sum} kWh (avg {OK_avg.ToString("F2")}) | OUTAGE : {outage_count} | TAMPER : {tamper_count}");
            Console.WriteLine("--------------------------------------------------");

            //3.004 - Multi-Meter Weekly Health Report
            int[][] meters = new int[][]  {
                new[] { 4, 5, 0, 0, 6, 7, 3 }, // A    
                new[] { 2, 2, 2, 2, 2, 2, 2 }, // B    
                new[] { 9, 1, 1, 1, 1, 1, 1 }  // C  
            };
            string[] ids = { "A-1001", "B-2001", "C-3001" };
            foreach (var meter in meters)
            {
                string id = ids[Array.IndexOf(meters, meter)];
                int total_meter = meter.Sum();
                double average_meter = meter.Average();
                bool PeakAlert = meter.Any(d => d > 8);
                int PeakAlertDay = Array.IndexOf(meter, meter.FirstOrDefault(d => d > 8)) + 1;
                bool SustainedOutage = meter.Skip(1)
                                            .Zip(meter, (current, previous) => current == 0 && previous == 0)
                                            .Any(x => x);
                int SustainedOutageDay = Array.IndexOf(meter, 0, Array.IndexOf(meter, 0) + 1) + 1;
                Console.WriteLine($"{id} | Total {total_meter} kWh | Average {average_meter.ToString("F2")} kWh | Peak Alert {(PeakAlert ? "True" : "False")}{(PeakAlert ? $" (Day {PeakAlertDay})" : "")} | Sustained Outage {(SustainedOutage ? "True" : "False")}{(SustainedOutage ? $" (Day {SustainedOutageDay - 1}-{SustainedOutageDay})" : "")}");
            }
            Console.WriteLine("--------------------------------------------------");

            //3.005 - Monthly Slab Billing with Category & Outage Check
            int[] pattern = { 4, 4, 5, 5, 0, 6, 7, 3, 4, 5 };
            string category = "COMMERCIAL";
            int[] month_units = pattern.Concat(pattern).Concat(pattern).ToArray();
            int monthlyUnits = month_units.Sum();
            int outageDays = month_units.Count(d => d == 0);
            double energyCharge2 = 0;
            energyCharge2 += Math.Min(monthlyUnits, 100) * 4.0;
            energyCharge2 += Math.Min(Math.Max(monthlyUnits - 100, 0), 200) * 6.0;
            energyCharge2 += Math.Max(monthlyUnits - 300, 0) * 8.5;
            int fixedCharge = category == "COMMERCIAL" ? 150 : 50;
            double rebate = outageDays == 0 ? (fixedCharge + energyCharge2) * 0.02 : 0;
            Console.WriteLine($"Category : {category} | Units : {monthlyUnits} kWh | Energy Charge : {energyCharge2.ToString("F2")} | Fixed Charge : {fixedCharge.ToString("F2")} | Rebate : {rebate.ToString("F2")} | Total : {(energyCharge2 + fixedCharge - rebate).ToString("F2")}");
            Console.WriteLine("--------------------------------------------------");

            //1.006 - Compute Net Consumption and Alerts
            int previousReading = 15000;
            int currentReading = 15620;
            int consumption6 = currentReading - previousReading;
            if (consumption6 < 0)
            {
                Console.WriteLine($"Net Consumption : {consumption6} kWh Invalid");
            }
            else if (consumption6 == 0)
            {
                Console.WriteLine($"Net Consumption : {consumption6} kWh Possible outage");
            }
            else if (consumption6 > 100 && consumption6 < 500)
            {
                Console.WriteLine($"Net Consumption : {consumption6} kWh Normal usage");
            }
            else if (consumption6 > 500)
            {
                Console.WriteLine($"Net Consumption : {consumption6} kWh High consumption Alert!");
            }
            Console.WriteLine("--------------------------------------------------");

            //2.007 - Meter Category-based Tariff using switch
            string meterCategory = "COMMERCIAL";
            int units7 = 120;
            switch (meterCategory)
            {
                case "AGRICULTURAL":
                    {
                        double charge = units7 * 3.0;
                        Console.WriteLine($"Category: {meterCategory} | Rate : 3.0 | Total Bill: {charge.ToString("F2")}");
                        break;
                    }
                case "COMMERCIAL":
                    {
                        double charge = units7 * 8.5;
                        Console.WriteLine($"Category: {meterCategory} | Rate : 8.5 | Total Bill: {charge.ToString("F2")}");
                        break;
                    }
                case "DOMESTIC":
                    {
                        double charge = units7 * 6.0;
                        Console.WriteLine($"Category: {meterCategory} | Rate : 6.0 | Total Bill: {charge.ToString("F2")}");
                        break;
                    }
                default:
                    {
                        Console.WriteLine("Unknown category. Check configuration.");
                        break;
                    }
            }
            Console.WriteLine("--------------------------------------------------");

            //2.008 - Loop-based Daily Consumption Summary
            double[] daily8 = { 5.2, 6.8, 0.0, 7.5, 6.0, 4.8, 0.0 };
            double total8 = daily8.Sum();
            double average8 = daily8.Average();
            int peakDays8 = daily8.Count(d => d > 6.0);
            int outageDays8 = daily8.Count(d => d == 0.0);
            Console.WriteLine($"Total : {total8} kWh | Average : {average8.ToString("F2")} kWh | Peak Days (>6kWh) : {peakDays8} | Outage Days : {outageDays8} | Performance Status : {(outageDays8<=1 && peakDays8<=2 ? "Stable" : "Unstable")}");
            Console.WriteLine("--------------------------------------------------");

            //3.009 - Analyze Tamper & Outage Patterns
            string[] status9 = { "OK", "OUTAGE", "OUTAGE", "TAMPER", "OUTAGE", "OK", "LOW_VOLT" };
            int okCount = 0;
            int outageCount = 0;
            int tamperCount = 0;
            int lowVoltCount = 0;
            foreach (string s in status9)
            {
                if (s == "OK") okCount++;
                else if (s == "OUTAGE") outageCount++;
                else if (s == "TAMPER") tamperCount++;
                else if (s == "LOW_VOLT") lowVoltCount++;
            }
            string msg = (tamperCount > 1 || outageCount > 2) ? "Maintenance required" : "Meter healthy";
            msg = (status9.Skip(1)
                .Zip(status9, (current, previous) => current == "TAMPER" && previous == "OUTAGE")
                .Any(x => x)) ? "Suspicious Pattern" : msg;
            Console.WriteLine($"OK : {okCount} | OUTAGE : {outageCount} | TAMPER : {tamperCount} | LOW_VOLT : {lowVoltCount} | Status : {msg}");
            Console.WriteLine("--------------------------------------------------");

            //3.010 - Multi-meter Outage Duration Analyzer
            int[] h1 = { 1, 0, 0, 5, 2, 0, 0 };
            int[] h2 = { 0, 0, 0, 0, 0, 0, 0 };
            int[] h3 = { 0, 4, 3, 0, 0, 0, 0 };
            string [] meterIds = { "MTR001", "MTR002", "MTR003" };
            int[][] hours = new int[][] { h1, h2, h3 };
            foreach (var hour in hours)
            {
                string id = meterIds[Array.IndexOf(hours, hour)];
                int totalOutageHours = hour.Sum();
                string action;
                if(totalOutageHours == 0)
                {
                    action = "No Action";
                }
                else if(totalOutageHours > 8)
                {
                    action = "Log Incident";
                }
                else
                {
                    action = "Send Crew";
                }
                Console.WriteLine($"{id} | Total Outage Hours : {totalOutageHours} | Prolonged Outage : {(prolongedOutage ? "True" : "False")}{(prolongedOutage ? $" (Day {prolongedOutageDay})" : "")}");
            }
        }
    }
}
