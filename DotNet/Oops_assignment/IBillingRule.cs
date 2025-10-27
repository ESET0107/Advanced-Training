using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tasks2_D2
{
    internal interface IBillingRule
    {
        double Compute(int units);
    }
    class DomesticRule : IBillingRule 
    {
        private double _multiplier;
        public DomesticRule(double multiplier = 1.0)
        {
            _multiplier = multiplier;
        }
        public double Compute(int units)
        {
            return (units * 6.0 + 50) * _multiplier;
        }
    }
    class CommercialRule : IBillingRule 
    {
        private double _multiplier;
        public CommercialRule(double multiplier = 1.0)
        {
            _multiplier = multiplier;
        }
        public double Compute(int units)
        {
            return (units * 8.5  + 150) * _multiplier;
        }
    }
    class AgricultureRule : IBillingRule {

        private double _multiplier;
        public AgricultureRule(double multiplier = 1.0)
        {
            _multiplier = multiplier;
        }
        public double Compute(int units)
        {
            return units * 3.0 * _multiplier;
        }
    }
    class BillingEngine 
    {
        private IBillingRule _rule;
        public BillingEngine(IBillingRule rule)
        {
            _rule = rule;
        }
        public double GenerateBill(int units)
        {
            return _rule.Compute(units);
        }
    }
    public interface IRebate
    {
        string Code { get; }
        double Apply(double currentTotal, int outageDays, int tamperDays = 0);
    }
    class NoOutageRebate : IRebate
    {
        public string Code => "NO_OUTAGE";
        public double Apply(double currentTotal, int outageDays, int tamperDays = 0)
        {
            if (outageDays == 0)
                return -0.02 * currentTotal;
            return 0;
        }
    }
    class HighUsageRebate : IRebate
    {
        public string Code => "HIGH_USAGE";
        public double Apply(double currentTotal, int outageDays, int tamperDays = 0)
        {
            if (currentTotal > 500)
                return -0.03 * currentTotal;
            return 0;
        }
    }
    class TamperRebate : IRebate
    {
        public string Code => "TAMPER_DAYS";
        public double Apply(double currentTotal, int outageDays, int tamperDays = 0)
        {
            if (tamperDays > 0)
                return +0.05 * currentTotal;
            return 0;
        }
    }
    class BillingContext
    {
        public IBillingRule Rule { get; }
        public List<IRebate> Rebates { get; } = new ();
        public BillingContext(IBillingRule rule) => Rule = rule;
        public double Finalize(int units, int outageDays , int tamperDays = 0)
        {
            double total = Rule.Compute(units);
            foreach (var r in Rebates) total += r.Apply(total, outageDays, tamperDays);
            return total;
        }
    }

}
