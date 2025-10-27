namespace Tasks2_D2
{
    internal class Program
    {
        static void Main(string[] args)
        {
            //Task-1
            //Meter meter1 = new Meter("AP - 12345", "Narasaraopet", new DateTime(2020, 1, 15), 5000);
            //Meter meter2 = new Meter("AP - 67890", "Guntur", new DateTime(2019, 6, 10), 7500);
            //meter1.AddReading(150);
            //meter2.AddReading(200);
            //Console.WriteLine(meter1);
            //Console.WriteLine(meter2);

            //Task-2
            //Tariff tariff1 = new Tariff("Domestic");
            //Tariff tariff2 = new Tariff("Commercial", 8.0);
            //Tariff tariff3 = new Tariff("Industrial", 10.0, 100);
            //tariff1.ComputeBill(120);
            //tariff2.ComputeBill(120);
            //tariff3.ComputeBill(120);

            //Task-3
            //Device[] devices = new Device[2];
            //devices[0] = new Meter3() { id = "MTR-001", installedOn = new DateOnly(2021, 5, 1), phasecount = 3 };
            //devices[1] = new Gateway() { id = "GTW-001", installedOn = new DateOnly(2022, 3, 15), IpAddress = "10.0.5.21" };
            //for (int i = 0; i < devices.Length; i++)
            //{
            //    devices[i].Describe();
            //}

            //Task-4
            //List<IReadable> readers = new List<IReadable>();
            //readers.Add(new DlmsMeter());
            //readers.Add(new ModemGateway());
            //readers.Add(new DlmsMeter());
            //readers.Add(new ModemGateway());
            //readers.Add(new DlmsMeter());
            //foreach (var reader in readers)
            //{
            //    Console.WriteLine($"{reader.SourceId} -> {reader.ReadKwh()}");
            //}

            //Task-5
            //BillingEngine billingEngine = new(new DomesticRule());
            //Console.WriteLine($"Domestic -> {billingEngine.GenerateBill(120)}");

            //BillingEngine billingEngine1 = new(new CommercialRule());
            //Console.WriteLine($"Commercial -> {billingEngine1.GenerateBill(120)}");

            //BillingEngine billingEngine2 = new(new AgricultureRule());
            //Console.WriteLine($"Agriculture -> {billingEngine2.GenerateBill(120)}");

            //Console.WriteLine("\n--- Peak Hour (1.2x) ---");
            //var domesticPeak = new BillingEngine(new DomesticRule(1.2));
            //var commercialPeak = new BillingEngine(new CommercialRule(1.2));
            //var agriculturePeak = new BillingEngine(new AgricultureRule(1.2));

            //Console.WriteLine($"DOMESTIC -> ₹{domesticPeak.GenerateBill(120):0.00}");
            //Console.WriteLine($"COMMERCIAL -> ₹{commercialPeak.GenerateBill(120):0.00}");
            //Console.WriteLine($"AGRICULTURE -> ₹{agriculturePeak.GenerateBill(120):0.00}");

            //Task-6
            //int[] hours = new int[24] { 28, 32, 30, 35, 30, 0, 20, 18, 15, 36, 0, 8, 6, 5, 7, 9, 12, 0, 18, 22, 25, 0, 35, 28 };
            //LoadProfileDay loadProfileDay = new LoadProfileDay(new DateTime(2025, 10, 01), hours);
            //Console.WriteLine($"{loadProfileDay.Date.ToShortDateString()} | Total : {loadProfileDay.Total} | Peak hour : {loadProfileDay.PeakHour} | Outage hours : {loadProfileDay.OutageHours}");

            //Task-7
            //int[] hours = new int[24] { 0, 1, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1 };
            //LoadProfileDay loadProfileDay = new LoadProfileDay(new DateTime(2025, 10, 01), hours);
            //PeakOveruseRule peakOveruseRule = new PeakOveruseRule(4);
            //if (peakOveruseRule.IsTriggered(loadProfileDay))
            //{
            //    Console.WriteLine(peakOveruseRule.Message(loadProfileDay));
            //}
            //SustainedOutageRule sustainedOutageRule = new SustainedOutageRule(6);
            //if (sustainedOutageRule.IsTriggered(loadProfileDay))
            //{
            //    Console.WriteLine(sustainedOutageRule.Message(loadProfileDay));
            //}

            //Task-9
            IBillingRule rule = new CommercialRule();
            BillingContext context = new BillingContext(rule);
            context.Rebates.Add(new NoOutageRebate());
            context.Rebates.Add(new HighUsageRebate());
            context.Rebates.Add(new TamperRebate());
            double total = context.Finalize(620, 0, 1);
            double subtotal = rule.Compute(620);
            Console.WriteLine($"Subtotal : {subtotal} | Total : {total}");

            //Task-10
            //IEnumerable<Event> events = new List<Event>
            //{
            //    new OutageEvent(new DateTime(2023, 10, 1, 14, 30, 0), "MTR-001", 120),
            //    new TamperEvent(new DateTime(2023, 10, 2, 9, 15, 0), "MTR-002", "TAMPER123"),
            //    new VoltageEvent(new DateTime(2023, 10, 17, 16, 45, 0), "MTR-003", 240.5),
            //    new OutageEvent(new DateTime(2023, 10, 18, 11, 0, 0), "MTR-004", 60),
            //    new TamperEvent(new DateTime(2023, 10, 9, 14, 0, 0), "MTR-005", "TAMPER456"),
            //    new VoltageEvent(new DateTime(2023, 10, 21, 18, 30, 0), "MTR-006", 230.0),
            //    new OutageEvent(new DateTime(2023, 9, 13, 11, 0, 0), "MTR-007", 90),
            //    new VoltageEvent(new DateTime(2023, 8, 21, 18, 36, 17), "MTR-006", 254.0)
            //};
            //EventProcessor.PrintTopSevere(events, 3);
        }
    }
}
