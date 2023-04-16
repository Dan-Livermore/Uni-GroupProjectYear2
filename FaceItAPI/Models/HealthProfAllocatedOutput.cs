using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations.Schema;

namespace FaceItAPI.Models
{
    public class HealthProfAllocatedOutput
    {
        [Key]
        [StringLength(100)]
        public int prof_id { get; set; }
        public int UserId { get; set; }
    }
}
