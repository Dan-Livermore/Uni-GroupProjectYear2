using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace FaceItAPI.Models
{
    public class healthProfIDandUserEmail
    {
        [Required]
        [Key]        
        public int prof_id { get; set; }

        [StringLength(100)]
        [Unicode(false)]
        public string UserEmail { get; set; } = null!;


    }
}
