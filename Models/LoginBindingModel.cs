using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;

namespace BarbellHero.Models
{
    public class LoginBindingModel
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }
    }
}
