using System.Globalization;

namespace Tasks_D1
{
    internal class Program
    {
        static void Main(string[] args)
        {
            //Task-1
            string studentName = "Bahu";
            int score1 = 73, score2 = 52, score3 = 78, score4 = 79, score5 = 90;
            Console.WriteLine($"Total score of {studentName} is: {score1 + score2 + score3 + score4 + score5}");
            Console.WriteLine($"Average score of {studentName} is: {Convert.ToDouble((score1 + score2 + score3 + score4 + score5) / 5.0)}");
            Console.WriteLine($"Percentage of {studentName} is: {Convert.ToDouble((score1 + score2 + score3 + score4 + score5) / 5.0)}%");
            Console.WriteLine();
            //Task-2
            double basicSalary = 2000000, HRA = basicSalary / 5, DA = basicSalary / 10, tax = 1.3 * basicSalary / 12.5,
                gross = 1.3 * basicSalary, netSalary = 0.92 * gross;
            Console.WriteLine($"Basic salary : {basicSalary}");
            Console.WriteLine($"HRA : {HRA}");
            Console.WriteLine($"DA : {DA}");
            Console.WriteLine($"Tax : {tax}");
            Console.WriteLine($"Gross salary : {gross}");
            Console.WriteLine($"Net salary : {netSalary}");
            Console.WriteLine();
            //Task-3
            double INR = 345000.0;
            double USD = INR / 83;
            double EUR = INR / 90.5;
            Console.WriteLine($"Amount in USD is: {Math.Round(USD, 2)}");
            Console.WriteLine($"Amount in EUR is: {Math.Round(EUR, 2)}");
            Console.WriteLine();
            //Task-4
            int totalMinutes = 2003;
            int hours = totalMinutes / 60;
            int minutes = totalMinutes % 60;
            Console.WriteLine($"Hours : {hours} and minutes : {minutes}");

            
        }
    }
}
