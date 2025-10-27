using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tasks1_D2
{
    internal class Company
    {
        public string employeeName;
        public int employeeId;
        static string companyName = "Esyasoft";
        public static void DisplayCompanyName()
        {
            Console.WriteLine($"Company Name: {companyName}");
        }
        public Company(string employeeName, int employeeId)
        {
            this.employeeName = employeeName;
            this.employeeId = employeeId;
        }
        public void DisplayEmployeeDetails()
        {
            Console.WriteLine($"Employee ID: {employeeId}, Employee Name: {employeeName}, Company Name: {companyName}");
        }
    }
}
