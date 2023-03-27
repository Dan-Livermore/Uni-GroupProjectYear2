using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace FaceItAPI.Models;

[Table("QUIZ1", Schema = "FaceIt")]
public partial class Quiz1
{
    [Key]
    [Column("user_id")]
    public int UserId { get; set; }

    [Column("S1_Q1")]
    public int? S1Q1 { get; set; }

    [Column("S1_Q2")]
    public int? S1Q2 { get; set; }

    [Column("S1_Q3A")]
    public int? S1Q3a { get; set; }

    [Column("S1_Q3B")]
    public int? S1Q3b { get; set; }

    [Column("S1_Q3C")]
    public int? S1Q3c { get; set; }

    [Column("S1_Q4A")]
    public int? S1Q4a { get; set; }

    [Column("S1_Q4B")]
    public int? S1Q4b { get; set; }

    [Column("S1_Q4C")]
    public int? S1Q4c { get; set; }
}
