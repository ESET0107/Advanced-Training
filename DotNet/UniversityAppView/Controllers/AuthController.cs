using Microsoft.AspNetCore.Mvc;

namespace UniversityAppView.Controllers
{
    public class AuthController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
        public IActionResult Register()
        {
            return View();
        }
        public IActionResult ForgotPassword()
        {
            return View();
        }
        [HttpGet("Auth/ResetPassword")]
        public IActionResult ResetPassword(string token)
        {
            try
            {
                if (string.IsNullOrEmpty(token))
                {
                    Console.WriteLine("⚠️ No token received in query string.");
                    return BadRequest("Missing token.");
                }

                Console.WriteLine($"✅ Token received: {token.Substring(0, Math.Min(token.Length, 20))}...");

                ViewBag.Token = token;
                return View();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"❌ Exception in ResetPassword(): {ex.Message}\n{ex.StackTrace}");
                return StatusCode(500, "An internal error occurred in ResetPassword view.");
            }
        }

    }
}
