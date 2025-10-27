using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tasks1_D2
{
    internal class Employee
    {
        public int id;
        public string name;
        public double basicSalary;
        public double HRA;
        public double DA;
        public double grossSalary;
        public Employee(int id, string name, double basicSalary)
        {
            this.id = id;
            this.name = name;
            this.basicSalary = basicSalary;
            HRA = (0.1 * basicSalary);
            DA = (0.05 * basicSalary);
            grossSalary = basicSalary + HRA + DA;
        }
        public void DisplaySalarySlip()
        {
            Console.WriteLine($"Employee ID: {id}, Employee Name: {name}, Basic Salary : {basicSalary}, HRA: {HRA}, DA: {DA}, Gross Salary: {grossSalary}");
        }
    }
}
