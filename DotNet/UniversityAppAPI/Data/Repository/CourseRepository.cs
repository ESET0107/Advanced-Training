using UniversityAppAPI.Models;
using Microsoft.EntityFrameworkCore;
namespace UniversityAppAPI.Data.Repository
{
    public class CourseRepository : ICourseRepository
    {
        private readonly UniversityContext _context;
        public CourseRepository(UniversityContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<Course>> GetAllCoursesAsync()
        {
            return await _context.Courses.Include(c => c.Students).ToListAsync();
        }
        public async Task<Course?> GetCourseByIdAsync(int courseId)
        {
            return await _context.Courses.Include(c => c.Students).FirstOrDefaultAsync(c => c.CourseId == courseId);
        }
        public async Task AddCourseAsync(Course course)
        {
            _context.Courses.Add(course);
            await _context.SaveChangesAsync();
        }
        public async Task UpdateCourseAsync(Course course)
        {
            _context.Courses.Update(course);
            await _context.SaveChangesAsync();
        }
        public async Task DeleteCourseAsync(int courseId)
        {
            var course = await _context.Courses.FindAsync(courseId);
            if (course != null)
            {
                _context.Courses.Remove(course);
                await _context.SaveChangesAsync();
            }
        }
    }
}
