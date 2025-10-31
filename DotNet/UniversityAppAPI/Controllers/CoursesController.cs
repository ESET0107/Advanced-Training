using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using UniversityAppAPI.Data.Repository;
using UniversityAppAPI.Models;
namespace UniversityAppAPI.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class CoursesController : ControllerBase
    {
        private readonly ICourseRepository _courseRepository;
        public CoursesController(ICourseRepository courseRepository)
        {
            _courseRepository = courseRepository;
        }
        [HttpGet("AllCourses")]
        public async Task<IActionResult> GetAllCourses()
        {
            var courses = await _courseRepository.GetAllCoursesAsync();
            return Ok(courses);
        }
        [HttpGet("GetCourseById/{id}")]
        public async Task<IActionResult> GetCourseById(int id)
        {
            var course = await _courseRepository.GetCourseByIdAsync(id);
            if (course == null)
            {
                return NotFound();
            }
            return Ok(course);
        }
        [HttpPost("AddCourse")]
        public async Task<IActionResult> AddCourse([FromBody] CourseDTO course)
        {
            var courseEntity = new Course
            {
                CourseCode = course.CourseCode,
                CourseName = course.CourseName,
                Department = course.Department,
                Semester = course.Semester
            };

            await _courseRepository.AddCourseAsync(courseEntity);
            return CreatedAtAction(nameof(GetCourseById), new { id = course.CourseId }, course);
        }
        [HttpPut("UpdateCourse/{id}")]
        public async Task<IActionResult> UpdateCourse(int id, [FromBody] CourseDTO course)
        {
            if (id != course.CourseId)
            {
                return BadRequest();
            }
            var courseEntity = new Course
            {
                CourseId = id,
                CourseCode = course.CourseCode,
                CourseName = course.CourseName,
                Department = course.Department,
                Semester = course.Semester
            };
            await _courseRepository.UpdateCourseAsync(courseEntity);
            return NoContent();
        }
        [HttpDelete("DeleteCourse/{id}")]
        public async Task<IActionResult> DeleteCourse(int id)
        {
            await _courseRepository.DeleteCourseAsync(id);
            return NoContent();
        }
    }
}
