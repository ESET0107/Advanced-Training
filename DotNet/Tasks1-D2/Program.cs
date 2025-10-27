namespace Tasks1_D2
{
    internal class Program
    {
        static void Main(string[] args)
        {
            //Task-1
            //Console.WriteLine("----Library Book Management System");
            //LibraryMS Book1 = new (1, "The Great Gatsby", "F. Scott Fitzgerald");
            //LibraryMS Book2 = new (2, "1984", "George Orwell");
            //LibraryMS Book3 = new (3, "To Kill a Mockingbird", "Harper Lee");
            //Book1.DisplayBookDetails();
            //Book1.IssueBook();
            //Book1.DisplayBookDetails();
            //Book1.ReturnBook();
            //Book1.DisplayBookDetails();
            //Book2.DisplayBookDetails();
            //Book3.DisplayBookDetails();
            //Book2.IssueBook();

            //Task-2
            //Console.WriteLine("----- Movie Ticket Booking System -----");
            //Movie Movie1 = new ("Inception", 100);
            //Movie Movie2 = new ("The Dark Knight", 150);
            //Movie1.DisplayAvaiableSeats();
            //Movie1.BookSeats(30);
            //Movie2.BookSeats(50);
            //Movie1.DisplayAvaiableSeats();
            //Movie1.CancelSeats(10);
            //Movie1.BookSeats(90);
            //Movie2.CancelSeats(70);

            //Task-3
            //Console.WriteLine("----- Company Employee Details -----");
            //Company emp1 = new ("Koushik", 107);
            //Company emp2 = new ("Jason", 148);
            //Company emp3 = new ("Virat", 18);
            //emp1.DisplayEmployeeDetails();
            //emp2.DisplayEmployeeDetails();
            //emp3.DisplayEmployeeDetails();

            //Task-4
            Console.WriteLine("----- Employee Salary Slip -----");
            Employee empA = new (101, "Eren", 400000);
            Employee empB = new (102, "Mikasa", 600000);
            Employee empC = new (103, "Armin", 800000);
            empA.DisplaySalarySlip();
            empB.DisplaySalarySlip();
            empC.DisplaySalarySlip();
        }
    }
}
