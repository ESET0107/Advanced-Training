using System.ComponentModel.DataAnnotations;

namespace UniversityAppAPI.Models
{
    public class User
    {
        [Key]
        public int UserId { get; set; }

        [Required]
        public string UserName { get; set; } = string.Empty;

        [Required]
        public string Password { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        public string Role { get; set; } = "Student";

        public string? ResetToken { get; set; }

        public DateTime? TokenExpiry { get; set; }
    }
}
