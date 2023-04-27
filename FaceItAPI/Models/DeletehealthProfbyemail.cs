using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace FaceItAPI.Models
{
    public class DeletehealthProfbyemail
    {
        [Required]
        [Key]
        public int prof_id { get; set; }

        [StringLength(100)]
        [Unicode(false)]
        public string UserEmail { get; set; } = null!;
    }
}
