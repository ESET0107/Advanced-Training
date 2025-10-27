using Tasks1_D4;
using System.Runtime.CompilerServices;
//Employee Data
var employees = new List<Employee>
            {
                new Employee{ Id=1, Name="Ravi", Department="IT", Salary=85000, Experience=5, Location="Bangalore"},
                new Employee{ Id=2, Name="Priya", Department="HR", Salary=52000, Experience=4, Location="Pune"},
                new Employee{ Id=3, Name="Kiran", Department="Finance", Salary=73000, Experience=6, Location="Hyderabad"},
                new Employee{ Id=4, Name="Asha", Department="IT", Salary=95000, Experience=8, Location="Bangalore"},
                new Employee{ Id=5, Name="Vijay", Department="Marketing", Salary=68000, Experience=5, Location="Mumbai"},
                new Employee{ Id=6, Name="Deepa", Department="HR", Salary=61000, Experience=7, Location="Delhi"},
                new Employee{ Id=7, Name="Arjun", Department="Finance", Salary=82000, Experience=9, Location="Bangalore"},
                new Employee{ Id=8, Name="Sneha", Department="IT", Salary=78000, Experience=4, Location="Pune"},
                new Employee{ Id=9, Name="Rohit", Department="Marketing", Salary=90000, Experience=10, Location="Delhi"},
                new Employee{ Id=10, Name="Meena", Department="Finance", Salary=66000, Experience=3, Location="Mumbai"}
            };

//Product Data

var products = new List<Product>
            {
                new Product{ Id=1, Name="Laptop", Category="Electronics", Price=75000, Stock=15 },
                new Product{ Id=2, Name="Smartphone", Category="Electronics", Price=55000, Stock=25 },
                new Product{ Id=3, Name="Tablet", Category="Electronics", Price=30000, Stock=10 },
                new Product{ Id=4, Name="Headphones", Category="Accessories", Price=2000, Stock=100 },
                new Product{ Id=5, Name="Shirt", Category="Fashion", Price=1500, Stock=50 },
                new Product{ Id=6, Name="Jeans", Category="Fashion", Price=2200, Stock=30 },
                new Product{ Id=7, Name="Shoes", Category="Fashion", Price=3500, Stock=20 },
                new Product{ Id=8, Name="Refrigerator", Category="Appliances", Price=45000, Stock=8 },
                new Product{ Id=9, Name="Washing Machine", Category="Appliances", Price=38000, Stock=6 },
                new Product{ Id=10, Name="Microwave", Category="Appliances", Price=12000, Stock=12 }
            };

//Student Data

var students = new List<Student>
            {
                new Student{ Id=1, Name="Asha", Course="C#", Marks=92, City="Bangalore"},
                new Student{ Id=2, Name="Ravi", Course="Java", Marks=85, City="Pune"},
                new Student{ Id=3, Name="Sneha", Course="Python", Marks=78, City="Hyderabad"},
                new Student{ Id=4, Name="Kiran", Course="C#", Marks=88, City="Delhi"},
                new Student{ Id=5, Name="Meena", Course="Python", Marks=95, City="Bangalore"},
                new Student{ Id=6, Name="Vijay", Course="C#", Marks=82, City="Chennai"},
                new Student{ Id=7, Name="Deepa", Course="Java", Marks=91, City="Mumbai"},
                new Student{ Id=8, Name="Arjun", Course="Python", Marks=89, City="Hyderabad"},
                new Student{ Id=9, Name="Priya", Course="C#", Marks=97, City="Pune"},
                new Student{ Id=10, Name="Rohit", Course="Java", Marks=74, City="Delhi"}
            };

//Order Data

var orders = new List<Order>
            {
                new Order{ OrderId=1001, CustomerId=1, Amount=2500, OrderDate=new DateTime(2025,5,12)},
                new Order{ OrderId=1002, CustomerId=2, Amount=1800, OrderDate=new DateTime(2025,5,13)},
                new Order{ OrderId=1003, CustomerId=1, Amount=4500, OrderDate=new DateTime(2025,5,20)},
                new Order{ OrderId=1004, CustomerId=3, Amount=6700, OrderDate=new DateTime(2025,6,01)},
                new Order{ OrderId=1005, CustomerId=4, Amount=2500, OrderDate=new DateTime(2025,6,02)},
                new Order{ OrderId=1006, CustomerId=2, Amount=5600, OrderDate=new DateTime(2025,6,10)},
                new Order{ OrderId=1007, CustomerId=5, Amount=3100, OrderDate=new DateTime(2025,6,12)},
                new Order{ OrderId=1008, CustomerId=3, Amount=7100, OrderDate=new DateTime(2025,7,01)},
                new Order{ OrderId=1009, CustomerId=4, Amount=4200, OrderDate=new DateTime(2025,7,05)},
                new Order{ OrderId=1010, CustomerId=5, Amount=2900, OrderDate=new DateTime(2025,7,10)}
            };
//Employee tasks
//1. Find all employees in the "IT" department.
var itEmployees = employees.Where(e => e.Department == "IT");
Console.WriteLine("Employees in IT Department:");
foreach (var emp in itEmployees)
{
    Console.WriteLine($"{emp.Name} - {emp.Department}");
}
Console.WriteLine("--------------------------------------------------");
//2. Get the names of employees with a salary greater than 70,000.
var highSalaryEmployees = employees.Where(e => e.Salary > 70000).Select(e => e.Name);
Console.WriteLine("Employees with Salary greater than 70,000:");
foreach (var name in highSalaryEmployees)
{
    Console.WriteLine(name);
}
Console.WriteLine("--------------------------------------------------");
//3. Find all employees located in "Bangalore".
var bangaloreEmployees = employees.Where(e => e.Location == "Bangalore");
Console.WriteLine("Employees in Bangalore:");
foreach (var emp in bangaloreEmployees)
{
    Console.WriteLine($"{emp.Name} - {emp.Location}");
}
Console.WriteLine("--------------------------------------------------");
//4. Display employees with more than 5 years of experience.
var experiencedEmployees = employees.Where(e => e.Experience > 5);
Console.WriteLine("Employees with more than 5 years of experience:");
foreach (var emp in experiencedEmployees)
{
    Console.WriteLine($"{emp.Name} - {emp.Experience} years");
}
Console.WriteLine("--------------------------------------------------");
//5. Show names of employees and their salaries in ascending order of salary.
var sortedBySalary = employees.OrderBy(e => e.Salary).Select(e => new { e.Name, e.Salary });
Console.WriteLine("Employees sorted by Salary (Ascending):");
foreach (var emp in sortedBySalary)
{
    Console.WriteLine($"{emp.Name} - {emp.Salary}");
}
Console.WriteLine("--------------------------------------------------");
//6. Group employees by location and count how many employees are in each location.
var groupByLocation = employees.GroupBy(e => e.Location)
                               .Select(g => new { Location = g.Key, Count = g.Count() });
Console.WriteLine("Employee count by Location:");
foreach (var group in groupByLocation)
{
    Console.WriteLine($"{group.Location} - {group.Count} employees");
}
Console.WriteLine("--------------------------------------------------");
//7. Display employees whose salary is above the average salary.
var averageSalary = employees.Average(e => e.Salary);
var aboveAverageSalary = employees.Where(e => e.Salary > averageSalary);
Console.WriteLine($"Average Salary: {averageSalary}");
Console.WriteLine("Employees with above average Salary:");
foreach (var emp in aboveAverageSalary)
{
    Console.WriteLine($"{emp.Name} - {emp.Salary}");
}
Console.WriteLine("--------------------------------------------------");
//8.Show top 3 highest-paid employees.
var top3HighestPaid = employees.OrderByDescending(e => e.Salary).Take(3);
Console.WriteLine("Top 3 Highest Paid Employees:");
foreach (var emp in top3HighestPaid)
{
    Console.WriteLine($"{emp.Name} - {emp.Salary}");
}
Console.WriteLine("--------------------------------------------------");

//Product tasks
//1.Display all products with stock less than 20.
var lowStockProducts = products.Where(p => p.Stock < 20);
Console.WriteLine("Products with stock less than 20:");
foreach (var prod in lowStockProducts)
{
    Console.WriteLine($"{prod.Name} - Stock: {prod.Stock}");
}
Console.WriteLine("--------------------------------------------------");
//2. Show all products belonging to the “Fashion” category.
var fashionProducts = products.Where(p => p.Category == "Fashion");
Console.WriteLine("Products in Fashion Category:");
foreach (var prod in fashionProducts)
{
    Console.WriteLine($"{prod.Name} - Category: {prod.Category}");
}
Console.WriteLine("--------------------------------------------------");
//3. Display product names and prices where price is greater than 10,000.
var expensiveProducts = products.Where(p => p.Price > 10000).Select(p => new { p.Name, p.Price });
Console.WriteLine("Products with price greater than 10,000:");
foreach (var prod in expensiveProducts)
{
    Console.WriteLine($"{prod.Name} - Price: {prod.Price}");
}
Console.WriteLine("--------------------------------------------------");
//4. List all product names sorted by price (descending).
var productsSortedByPrice = products.OrderByDescending(p => p.Price).Select(p => p.Name);
Console.WriteLine("Products sorted by Price (Descending):");
foreach (var name in productsSortedByPrice)
{
    Console.WriteLine(name);
}
Console.WriteLine("--------------------------------------------------");
//5.Find the most expensive product in each category.
var mostExpensiveByCategory = products.GroupBy(p => p.Category)
                                     .Select(g => g.OrderByDescending(p => p.Price).First());
Console.WriteLine("Most expensive product in each category:");
foreach (var prod in mostExpensiveByCategory)
{
    Console.WriteLine($"{prod.Category} - {prod.Name} - Price: {prod.Price}");
}
Console.WriteLine("--------------------------------------------------");
//6.Show total stock per category.
var totalStockByCategory = products.GroupBy(p => p.Category)
                                  .Select(g => new { Category = g.Key, TotalStock = g.Sum(p => p.Stock) });
Console.WriteLine("Total stock per category:");
foreach (var group in totalStockByCategory)
{
    Console.WriteLine($"{group.Category} - Total Stock: {group.TotalStock}");
}
Console.WriteLine("--------------------------------------------------");
//7.Display products whose name starts with ‘S’.
var productsStartingWithS = products.Where(p => p.Name.StartsWith("S"));
Console.WriteLine("Products starting with 'S':");
foreach (var prod in productsStartingWithS)
{
    Console.WriteLine(prod.Name);
}
Console.WriteLine("--------------------------------------------------");
//8.Show average price of products in each category.
var averagePriceByCategory = products.GroupBy(p => p.Category)
                                    .Select(g => new { Category = g.Key, AveragePrice = g.Average(p => p.Price) });
Console.WriteLine("Average price of products in each category:");
foreach (var group in averagePriceByCategory)
{
    Console.WriteLine($"{group.Category} - Average Price: {group.AveragePrice}");
}
Console.WriteLine("--------------------------------------------------");

//Student tasks
//1.Find the highest scorer in each course.
var highestScorerByCourse = students.GroupBy(s => s.Course)
                                   .Select(g => g.OrderByDescending(s => s.Marks).First());
Console.WriteLine("Highest scorer in each course:");
foreach (var student in highestScorerByCourse)
{
    Console.WriteLine($"{student.Course} - {student.Name} - Marks: {student.Marks}");
}
Console.WriteLine("--------------------------------------------------");
//2.Display average marks of all students city-wise.
var averageMarksByCity = students.GroupBy(s => s.City)
                                 .Select(g => new { City = g.Key, AverageMarks = g.Average(s => s.Marks) });
Console.WriteLine("Average marks of students city-wise:");
foreach (var group in averageMarksByCity)
{
    Console.WriteLine($"{group.City} - Average Marks: {group.AverageMarks}");
}
Console.WriteLine("--------------------------------------------------");
//3.Display names and marks of students ranked by marks.
var studentsRankedByMarks = students.OrderByDescending(s => s.Marks).Select(s => new { s.Name, s.Marks });
Console.WriteLine("Students ranked by Marks:");
foreach (var student in studentsRankedByMarks)
{
    Console.WriteLine($"{student.Name} - Marks: {student.Marks}");
}
Console.WriteLine("--------------------------------------------------");

//Order tasks
//1.Find total order amount per month.
var totalOrderAmountPerMonth = orders.GroupBy(o => new { o.OrderDate.Year, o.OrderDate.Month })
                                     .Select(g => new
                                     {
                                         Year = g.Key.Year,
                                         Month = g.Key.Month,
                                         TotalAmount = g.Sum(o => o.Amount)
                                     });
Console.WriteLine("Total order amount per month:");
foreach (var group in totalOrderAmountPerMonth)
{
    Console.WriteLine($"{group.Year}-{group.Month} - Total Amount: {group.TotalAmount}");
}
Console.WriteLine("--------------------------------------------------");
//2.Show the customer who spent the most in total.
var topSpender = orders.GroupBy(o => o.CustomerId)
                       .Select(g => new { CustomerId = g.Key, TotalSpent = g.Sum(o => o.Amount) })
                       .OrderByDescending(g => g.TotalSpent)
                       .FirstOrDefault();
Console.WriteLine("Customer who spent the most:");
Console.WriteLine($"Customer ID: {topSpender.CustomerId} - Total Spent: {topSpender.TotalSpent}");
Console.WriteLine("--------------------------------------------------");
//3.Display orders grouped by customer and show total amount spent.
var totalSpentByCustomer = orders.GroupBy(o => o.CustomerId)
                                 .Select(g => new { CustomerId = g.Key, TotalSpent = g.Sum(o => o.Amount) });
Console.WriteLine("Total amount spent by each customer:");
foreach (var group in totalSpentByCustomer)
{
    Console.WriteLine($"Customer ID: {group.CustomerId} - Total Spent: {group.TotalSpent}");
}
Console.WriteLine("--------------------------------------------------");
//4.Display the top 2 orders with the highest amount.
var top2Orders = orders.OrderByDescending(o => o.Amount).Take(2);
Console.WriteLine("Top 2 orders with the highest amount:");
foreach (var order in top2Orders)
{
    Console.WriteLine($"Order ID: {order.OrderId} - Amount: {order.Amount}");
}

