using System.Collections.Generic;
using System.Threading.Tasks;
using UniversityAppAPI.Models;
namespace UniversityAppAPI.Data.Repository
{
    public interface ICourseRepository
    {
        Task<IEnumerable<Course>> GetAllCoursesAsync();
        Task<Course?> GetCourseByIdAsync(int courseId);
        Task AddCourseAsync(Course course);
        Task UpdateCourseAsync(Course course);
        Task DeleteCourseAsync(int courseId);
    }
}
