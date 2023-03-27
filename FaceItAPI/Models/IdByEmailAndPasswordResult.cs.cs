using System.ComponentModel.DataAnnotations;

namespace FaceItAPI.Models
{
    public class IdByEmailAndPasswordResult
    {
        [Key]
        public int UserId { get; set; }
    }
}

