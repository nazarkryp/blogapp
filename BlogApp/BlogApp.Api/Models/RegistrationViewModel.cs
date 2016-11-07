using System.ComponentModel.DataAnnotations;

namespace BlogApp.Api.Models
{
    public class RegistrationViewModel
    {
        [Required]
        public string Username { get; set; }
        [Required]
        public string Password { get; set; }
    }
}