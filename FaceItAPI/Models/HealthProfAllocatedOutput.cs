using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations.Schema;

namespace FaceItAPI.Models
{
    public class HealthProfAllocatedOutput
    {
        [Key]
        [Column("user_id")]
        public int UserId { get; set; }

        
        [Column("prof_id")]
        public int prof_id { get; set; }
        
        
    }
}
