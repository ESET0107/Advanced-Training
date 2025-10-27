using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tasks2_D2
{
    abstract class AlarmRule
    {
        public string Name { get; }
        protected AlarmRule(string name) => Name = name;
        public abstract bool IsTriggered(LoadProfileDay day);
        public virtual string Message(LoadProfileDay day)
            => $"{Name} triggered on {day.Date:yyyy-MM-dd}";
    }
    class PeakOveruseRule : AlarmRule
    {   // trigger if day.Total > threshold
        private readonly int _threshold;
        public PeakOveruseRule(int threshold) : base("PeakOveruse") => _threshold = threshold;
        public override bool IsTriggered(LoadProfileDay day) => day.Total > _threshold;
    }

    class SustainedOutageRule : AlarmRule
    {   // trigger if consecutive zero hours >= N
        private readonly int _minConsecutive;
        private int start_hour = -1;
        public SustainedOutageRule(int min) : base("SustainedOutage") => _minConsecutive = min;
        public override bool IsTriggered(LoadProfileDay day) 
        {
            /* scan */
            int ct = 0,mx=0;
            for(int i=0; i<24; i++)
            {
                if(day.HourlyKwh[i] == 0)
                {
                    ct++;
                    if(ct == _minConsecutive)
                    {
                        start_hour = i - _minConsecutive + 1;
                        return true;
                    }
                }
                else
                {
                    ct = 0;
                }
            }
            return false;
        }

        public override string Message(LoadProfileDay day)
        {
            return start_hour >= 0
                ? $"{Name} triggered on {day.Date:yyyy-MM-dd} starting at hour {start_hour}"
                : base.Message(day);
        }
    }
}
