using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AdvTr_1
{
    internal class Week1_D2
    {
    }
    // Inheritance Example
    public class Organs
    {
        public int hands;
        public int legs;
    }
    public class human : Organs
    {
        public string name;
        public int age;
        public human(string name, int age)
        {
            this.name = name;
            this.age = age;
        }
        public void Eat(string food)
        {
            Console.WriteLine($"{name} is eating {food}.");
        }
        public void no_of_legs()
        {
            legs = 2;
            Console.WriteLine($"{name} has {legs} legs.");
        }
    }
    // Polymorphism Example - Abstract Class
    abstract class Animal
    {
        public abstract void MakeSound();
    }
    class Dog : Animal
    {
        public override void MakeSound()
        {
            Console.WriteLine("Woof!");
        }
    }
    //Method Overloading Example
    public class Farewell
    {
        public static void SayGoodbye()
        {
            Console.WriteLine("Goodbye! Have a great day!");
        }
        public static void SayGoodbye(string name)
        {
            Console.WriteLine($"Goodbye, {name}! Have a great day!");
        }
        public static void SayGoodbye(string name, string timeOfDay)
        {
            Console.WriteLine($"Goodbye, {name}! Have a great {timeOfDay}!");
        }
    }
    // Encapsulation Example
    public class BankAccount
    {
        private decimal balance;
        public decimal Balance
        {
            get { return balance; }
            private set { balance = value; }
        }
        public BankAccount(decimal initialBalance)
        {
            balance = initialBalance;
        }
        // Method to deposit money
        public void Deposit(decimal amount)
        {
            if (amount > 0)
            {
                balance += amount;
                Console.WriteLine($"Deposited: ₹{amount:C}. New Balance: ₹{balance:C}");
            }
            else
            {
                Console.WriteLine("Deposit amount must be positive.");
            }
        }
        // Method to withdraw money
        public void Withdraw(decimal amount)
        {
            if (amount > 0 && amount <= balance)
            {
                balance -= amount;
                Console.WriteLine($"Withdrew: ₹{amount:C}. New Balance: ₹{balance:C}");
            }
            else
            {
                Console.WriteLine("Invalid withdrawal amount.");
            }
        }
    }
}