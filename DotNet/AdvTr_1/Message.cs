using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AdvTr_1
{
    static class Message
    {
        public static void Show(string msg)
        {
            Console.WriteLine(msg);
        }
        public static void greet(string name)
        {
            Console.WriteLine($"Hello {name}");
        }
    }
}
