using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;

namespace AdvTr_1
{
    internal class Human
    {
        public string name;
        public int age;
        public Human(string name, int age)
        {
            this.name = name;
            this.age = age;
        }
        public Human(string name, int age, string contact_no)
        {
            this.name = name;
            this.age = age;
        }

        public void Introduce()
        {
            Console.WriteLine($"Hello, my name is {name} and I am {age} years old.");
        }
        public void HaveBirthday()
        {
            age++;
            Console.WriteLine($"Happy birthday {name}! You are now {age} years old.");
        }
        public void Eat(string food)
        {
            Console.WriteLine($"{name} is eating {food}.");
        }
    }
}