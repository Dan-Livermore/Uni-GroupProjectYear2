using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace FaceItAPI.Models
{
    public class UserAssignedHealthProfOutput
    {
        [Key]
        public int prof_id { get; set; }
    }
}
