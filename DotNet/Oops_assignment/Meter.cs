using System;

namespace Tasks2_D2
{
    internal class Meter
    {
        private string _meterSerial;
        private string _location;
        private int _lastReadingKwh;

        public string MeterSerial
        {
            get => _meterSerial;
            set => _meterSerial = string.IsNullOrWhiteSpace(value)
                ? throw new ArgumentException("Meter serial cannot be empty.")
                : value;
        }

        public string Location
        {
            get => _location;
            set => _location = string.IsNullOrWhiteSpace(value)
                ? throw new ArgumentException("Location cannot be empty.")
                : value;
        }

        public DateTime InstalledOn { get; set; }

        public int LastReadingKwh
        {
            get => _lastReadingKwh;
            set => _lastReadingKwh = value < 0
                ? throw new ArgumentException("Reading cannot be negative.")
                : value;
        }

        public Meter(string meterSerial, string location, DateTime installedOn, int lastReadingKwh)
        {
            MeterSerial = meterSerial;
            Location = location;
            InstalledOn = installedOn;
            LastReadingKwh = lastReadingKwh;
        }

        public void AddReading(int deltaKwh)
        {
            if (deltaKwh <= 0)
                throw new ArgumentException("Delta must be positive.");
            LastReadingKwh += deltaKwh;
        }

        public override string ToString()
        {
            return $"{MeterSerial} | Location: {Location} | Installed: {InstalledOn:d} | Reading: {LastReadingKwh} kWh";
        }
    }
}
