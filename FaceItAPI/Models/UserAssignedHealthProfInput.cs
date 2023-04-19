using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FaceItAPI.Models
{
    public class UserAssignedHealthProfInput
    {
        [Required]
        [Key]
        public int UserId { get; set; }
    }
}
