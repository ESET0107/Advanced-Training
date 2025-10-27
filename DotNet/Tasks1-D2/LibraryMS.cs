using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tasks1_D2
{
    internal class LibraryMS
    {
        public int bookId;
        public string title;
        public string author;
        public bool isIssued;

        public LibraryMS(int bookId, string title, string author)
        {
            this.bookId = bookId;
            this.title = title;
            this.author = author;
            this.isIssued = false;
        }
        public void IssueBook()
        {
            if (!isIssued)
            {
                isIssued = true;
                Console.WriteLine($"Book '{title}' issued successfully.");
            }
            else
            {
                Console.WriteLine($"Book '{title}' is already issued.");
            }
        }
        public void ReturnBook()
        {
            if (isIssued)
            {
                isIssued = false;
                Console.WriteLine($"Book '{title}' returned successfully.");
            }
            else
            {
                Console.WriteLine($"Book '{title}' was not issued.");
            }
        }
        public void DisplayBookDetails()
        {
            Console.WriteLine($"Book ID: {bookId}, Title: {title}, Author: {author}, Issued: {isIssued}");
        }
    }
}
