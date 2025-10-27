namespace Tasks2_D1
{
    internal class Program
    {
        static void Main(string[] args)
        {
            //Task-1
            for (int i = 1; i <= 10; i++)
            {
                Console.WriteLine($"Square of {i} is: {i * i}");
            }
            Console.WriteLine();
            for (int i = 1; i <= 10; i++)
            {
                Console.WriteLine($"Cube of {i} is: {i * i * i}");
            }
            Console.WriteLine();
            //Task-2
            for (int i = 1; i <= 1000; i++)
            {
                int sum = 0;
                for (int j = 1; j <= i / 2; j++)
                {
                    if (i % j == 0)
                    {
                        sum += j;
                    }
                }
                if (sum == i)
                {
                    Console.WriteLine($"{i} is a perfect number");
                }
            }
            Console.WriteLine();
            //Task-3
            for (int i = 5; i >= 1; i -= 2)
            {
                for (int j = 5; j > i; j -= 2)
                    Console.Write(" ");
                for (int k = 1; k <= i; k++)
                    Console.Write("*");
                Console.WriteLine();
            }
            for (int i = 3; i <= 5; i += 2)
            {
                for (int j = 5; j > i; j -= 2)
                    Console.Write(" ");
                for (int k = 1; k <= i; k++)
                    Console.Write("*");
                Console.WriteLine();
            }
            Console.WriteLine();
            //Task-4
            for (int i = 1; i <= 5; i++)
            {
                for (int j = i; j < 5; j++)
                    Console.Write(" ");

                for (int k = 1; k <= i; k++)
                    Console.Write(k);

                for (int k = i - 1; k >= 1; k--)
                    Console.Write(k);

                Console.WriteLine();
            }
            Console.WriteLine();
            //Task-5
            for (int i = 1; i <= 5; i++)
            {
                if (i % 2 == 1)
                {
                    for (int j = 1; j <= i; j++)
                    {
                        if (j % 2 == 0)
                            Console.Write("0 ");
                        else
                            Console.Write("1 ");
                    }
                }
                else
                {
                    for (int j = 1; j <= i; j++)
                    {
                        if (j % 2 == 0)
                            Console.Write("1 ");
                        else
                            Console.Write("0 ");
                    }
                }
                Console.WriteLine();
            }
            Console.WriteLine();
            //Task-6
            for (int i = 100; i <= 999; i++)
            {
                int sum = 0;
                int temp = i;
                while (temp > 0)
                {
                    int digit = temp % 10;
                    sum += digit * digit * digit;
                    temp /= 10;
                }
                if (sum == i)
                {
                    Console.WriteLine($"{i} is an Armstrong number");
                }
            }
            Console.WriteLine();
            //Task-7
            int[] fib = new int[10];
            fib[0] = 1;
            fib[1] = 1;
            for (int i = 2; i < 10; i++)
            {
                fib[i] = fib[i - 1] + fib[i - 2];
            }
            for (int i = fib.Length - 1; i >= 0; i--)
            {
                Console.Write(fib[i] + " ");
            }
            Console.WriteLine();
            //Task-8
            for (int i = 1; i <= 4; i++)
            {
                for (int j = 1; j <= 13; j++)
                {
                    if (i + j == 5 || i + j == 11 || j - i == 9 || j - i == 3)
                        Console.Write("*");
                    else
                        Console.Write(" ");
                }
                Console.WriteLine();
            }
            Console.WriteLine();
            //Task-9
            int num = 978798;
            int length = 0;
            while (num != 0)
            {
                num /= 10;
                length++;
            }
            Console.WriteLine($"Length of the number is: {length}");
            Console.WriteLine();
            //Task-10
            for (int i = 1; i <= 5; i++)
            {
                for (int j = i; j <= 4; j++)
                    Console.Write(" ");
                for (int k = 1; k <= i; k++)
                    Console.Write(k);
                for (int k = i - 1; k >= 1; k--)
                    Console.Write(k);
                Console.WriteLine();
            }
            for (int i = 4; i >= 1; i--)
            {
                for (int j = 4; j >= i; j--)
                    Console.Write(" ");
                for (int k = 1; k <= i; k++)
                    Console.Write(k);
                for (int k = i - 1; k >= 1; k--)
                    Console.Write(k);
                Console.WriteLine();
            }
        }
    }
}
