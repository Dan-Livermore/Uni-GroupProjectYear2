using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace FaceItAPI.Models;

[PrimaryKey("ProfId", "UserId")]
[Table("HealthProfUsers", Schema = "FaceIt")]
public partial class HealthProfUser
{
    [Key]
    [Column("prof_id")]
    public int ProfId { get; set; }

    [Key]
    [Column("user_id")]
    public int UserId { get; set; }
}
