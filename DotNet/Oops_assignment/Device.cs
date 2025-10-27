using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tasks2_D2
{
    internal class Device
    {
        public string id;
        public DateOnly installedOn;
        public virtual void Describe()
        {
           Console.WriteLine($"Device {id} , Installed on {installedOn}");
        }
    }
    class Meter3 : Device
    {
        public int phasecount;
        public override void Describe()
        {
            Console.WriteLine($"Meter Id : {id} | Installed : {installedOn} | Phases : { phasecount}");
        }
    }
    class Gateway : Device
    {
        public string IpAddress;
        public override void Describe()
        {
            Console.WriteLine($"Gateway Id : {id} | Installed : {installedOn} | IP : { IpAddress}");
        }
    }
}
