using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tasks1_D2
{
    internal class Movie
    {
        public string movieName;
        public int totalSeats;
        public int bookedSeats;
        public Movie(string movieName, int totalSeats)
        {
            this.movieName = movieName;
            this.totalSeats = totalSeats;
            this.bookedSeats = 0;
        }
        public void BookSeats(int seats)
        {
            if (seats <= 0)
            {
                Console.WriteLine("Number of seats to book should be greater than zero.");
                return;
            }
            if (bookedSeats + seats <= totalSeats)
            {
                bookedSeats += seats;
                Console.WriteLine($"{seats} seats booked successfully for '{movieName}'.");
            }
            else
            {
                Console.WriteLine($"Not enough available seats for '{movieName}'. Only {totalSeats - bookedSeats} seats left.");
            }
        }
        public void CancelSeats(int seats)
        {
            if (seats <= 0)
            {
                Console.WriteLine("Number of seats to cancel should be greater than zero.");
                return;
            }
            if (seats <= bookedSeats)
            {
                bookedSeats -= seats;
                Console.WriteLine($"{seats} seats cancelled successfully for '{movieName}'.");
            }
            else
            {
                Console.WriteLine($"Cannot cancel {seats} seats for '{movieName}'. Only {bookedSeats} seats are currently booked.");
            }
        }
        public void DisplayAvaiableSeats()
        {
            Console.WriteLine($"Movie: {movieName}, Total Seats: {totalSeats}, Booked Seats: {bookedSeats}, Available Seats: {totalSeats - bookedSeats}");
        }
    }
}
