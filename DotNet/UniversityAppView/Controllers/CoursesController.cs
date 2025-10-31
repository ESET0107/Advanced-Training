using Microsoft.AspNetCore.Mvc;

namespace UniversityAppView.Controllers
{
    public class CoursesController : Controller
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
            ViewBag.CourseId = id; // Pass id to the view
            return View();
        }
    }
}
