using System.ComponentModel.DataAnnotations;

namespace FaceItAPI.Models
{
    public class UserAssignedHealthProfInput
    {
        [Required]
        [Key]
        public int UserId { get; set; }
    }
}
