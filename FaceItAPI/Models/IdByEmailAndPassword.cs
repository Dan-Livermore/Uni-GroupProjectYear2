using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FaceItAPI.Models
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
        [JsonIgnore]
        public int UserId { get; set; }
    }
}
