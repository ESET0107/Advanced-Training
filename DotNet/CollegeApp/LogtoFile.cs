using CollegeApp.Mylogger;

namespace CollegeApp
{
    public class LogtoFile : IMylogger
    {
        public void Log(string message)
        {
            Console.WriteLine(message);
            Console.WriteLine("LogtoFile");
        }
    }
}
