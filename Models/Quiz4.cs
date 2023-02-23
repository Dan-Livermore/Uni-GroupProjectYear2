using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace FaceIt2023.Models;

[Table("QUIZ4", Schema = "FaceIt")]
public partial class Quiz4
{
    [Key]
    [Column("user_id")]
    public int UserId { get; set; }

    [Column("S4_Q1")]
    public int? S4Q1 { get; set; }

    [Column("S4_Q2")]
    public int? S4Q2 { get; set; }

    [Column("S4_Q3")]
    public int? S4Q3 { get; set; }

    [Column("S4_Q4")]
    public int? S4Q4 { get; set; }

    [Column("S4_Q5")]
    public int? S4Q5 { get; set; }

    [Column("S4_Q6")]
    public int? S4Q6 { get; set; }

    [Column("S4_Q7")]
    public int? S4Q7 { get; set; }

    [Column("S4_Q8")]
    public int? S4Q8 { get; set; }
}
