using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace FaceItAPI.Models;

[Table("QUIZ5", Schema = "FaceIt")]
public partial class Quiz5
{
    [Key]
    [Column("user_id")]
    public int UserId { get; set; }

    [Column("S5_Q1")]
    public int? S5Q1 { get; set; }

    [Column("S5_Q2")]
    public int? S5Q2 { get; set; }

    [Column("S5_Q3A")]
    public int? S5Q3a { get; set; }

    [Column("S5_Q3B")]
    public int? S5Q3b { get; set; }

    [Column("S5_Q3C")]
    public int? S5Q3c { get; set; }

    [Column("S5_Q4A")]
    public int? S5Q4a { get; set; }

    [Column("S5_Q4B")]
    public int? S5Q4b { get; set; }

    [Column("S5_Q4C")]
    public int? S5Q4c { get; set; }
}
