using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tasks2_D2
{
    internal class LoadProfileDay
    {
        public DateTime Date { get; }
        public int[] HourlyKwh { get; } // length 24
        public LoadProfileDay(DateTime date, int[] hourly)
        {
            // clone array; validate length == 24; values >= 0
            Date = date;
            HourlyKwh = hourly;
        }
        public int Total=> HourlyKwh.Sum();
        public int PeakHour => Array.IndexOf(HourlyKwh, HourlyKwh.Max());
        public int OutageHours => HourlyKwh.Count(h => h == 0);
    }
}
