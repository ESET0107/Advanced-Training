using Microsoft.AspNetCore.Mvc;

namespace AMI_ProjectMVC.Controllers
{
    public class TariffController : Controller
    {
        public IActionResult TariffData()
        {
            return View();
        }
    }
}
