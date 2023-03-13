using System.ComponentModel.DataAnnotations;

namespace FaceIt2023.Models
{
    public class IdByEmailAndPassword
    {
        [Required]
        [StringLength(100)]
        public string Email { get; set; }

        [Required]
        [StringLength(100)]
        public string Password { get; set; }

        [Key]
        public int UserId { get; set; }
    }
}
