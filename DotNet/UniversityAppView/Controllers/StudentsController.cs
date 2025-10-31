using Microsoft.AspNetCore.Mvc;

namespace UniversityAppView.Controllers
{
    public class StudentsController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
        public IActionResult Add()
        {
            return View();
        }

        // ✅ This action loads the Edit page (Edit.cshtml)
        public IActionResult Edit(int id)
        {
            ViewBag.StudentId = id; // Pass id to the view
            return View();
        }
    }
}
