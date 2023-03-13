using System.ComponentModel.DataAnnotations;

namespace FaceIt2023.Models
{
    public class IdByEmailAndPasswordResult
    {     
        [Key]
        public int UserId { get; set; }
    }
}

