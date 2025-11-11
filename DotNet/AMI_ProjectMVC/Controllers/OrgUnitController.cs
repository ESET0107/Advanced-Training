using Microsoft.AspNetCore.Mvc;

namespace AMI_ProjectMVC.Controllers
{
    public class OrgUnitController : Controller
    {
        public IActionResult OrgUnitHierarchy()
        {
            return View();
        }
    }
}
