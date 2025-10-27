using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tasks2_D2
{
    internal interface IReadable
    {
        int ReadKwh();
        string SourceId { get; }
    }
    class DlmsMeter : IReadable
    {
        public int ReadKwh()
        {
            Random random = new Random();
            return random.Next(1, 11);
        }
        public string SourceId => "AP-0001";

    } 

        class ModemGateway : IReadable
        {
            public int ReadKwh()
            {
                Random random = new Random();
                return random.Next(0, 3);
            }
            public string SourceId => "GW-21";
        }
    }
