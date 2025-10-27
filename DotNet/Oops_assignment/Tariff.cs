using System;

namespace Tasks2_D2
{
    internal class Tariff
    {
        public string Name { get; set; }
        public double RatePerKwh { get; set; }
        public double FixedCharge { get; set; }

        public Tariff(string name) : this(name, 6.0, 50) { }

        public Tariff(string name, double ratePerKwh) : this(name, ratePerKwh, 50) { }

        public Tariff(string name, double ratePerKwh, double fixedCharge) 
        {
            Name = name;
            RatePerKwh = ratePerKwh;
            FixedCharge = fixedCharge;
            Validate();
        }

        public void Validate()
        {
            if (RatePerKwh <= 0)
                throw new ArgumentException("Rate per kWh must be greater than zero.");
            if (FixedCharge < 0)
                throw new ArgumentException("Fixed charge cannot be negative.");
        }

        public void ComputeBill(double units)
        {
            double total = units * RatePerKwh + FixedCharge;
            Console.WriteLine($"{Name}: {total:F2}");
        }
    }
}
