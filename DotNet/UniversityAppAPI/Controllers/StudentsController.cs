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
    public class StudentsController : ControllerBase
    {
        private readonly IStudentRepository _studentRepository;
        public StudentsController(IStudentRepository studentRepository)
        {
            _studentRepository = studentRepository;
        }
        [HttpGet("AllStudents")]
        public async Task<IActionResult> GetAllStudents()
        {
            var students = await _studentRepository.GetAllStudentsAsync();
            return Ok(students);
        }
        [HttpGet("GetStudentById/{id}")]
        public async Task<IActionResult> GetStudentById(int id)
        {
            var student = await _studentRepository.GetStudentByIdAsync(id);
            if (student == null)
            {
                return NotFound();
            }
            return Ok(student);
        }
        [HttpPost("AddStudent")]
        public async Task<IActionResult> AddStudent([FromBody] StudentDTO student)
        {
            var studentEntity = new Student
            {
                RollNumber = student.RollNumber,
                Name = student.Name,
                Email = student.Email,
                Phone = student.Phone,
                Address = student.Address,
                DateOfBirth = student.DateOfBirth,
                Gender = student.Gender,
                CourseId = student.CourseId
            };
            await _studentRepository.AddStudentAsync(studentEntity);
            return CreatedAtAction(nameof(GetStudentById), new { id = student.StudentId }, student);
        }
        [HttpPut("UpdateStudent/{id}")]
        public async Task<IActionResult> UpdateStudent(int id, [FromBody] StudentDTO student)
        {
            if (id != student.StudentId)
            {
                return BadRequest();
            }
            var studentEntity = new Student
            {
                StudentId = id,
                RollNumber = student.RollNumber,
                Name = student.Name,
                Email = student.Email,
                Phone = student.Phone,
                Address = student.Address,
                DateOfBirth = student.DateOfBirth,
                Gender = student.Gender,
                CourseId = student.CourseId
            };
            await _studentRepository.UpdateStudentAsync(studentEntity);
            return NoContent();
        }
        [HttpDelete("DeleteStudent/{id}")]
        public async Task<IActionResult> DeleteStudent(int id)
        {
            await _studentRepository.DeleteStudentAsync(id);
            return NoContent();
        }
    }
}
