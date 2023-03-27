using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace FaceItAPI.Models;

[Table("QUIZ2", Schema = "FaceIt")]
public partial class Quiz2
{
    [Key]
    [Column("user_id")]
    public int UserId { get; set; }

    [Column("S2_Q1")]
    public int? S2Q1 { get; set; }

    [Column("S2_Q2")]
    public int? S2Q2 { get; set; }

    [Column("S2_Q3")]
    public int? S2Q3 { get; set; }

    [Column("S2_Q4")]
    public int? S2Q4 { get; set; }

    [Column("S2_Q5")]
    public int? S2Q5 { get; set; }

    [Column("S2_Q6")]
    public int? S2Q6 { get; set; }

    [Column("S2_Q7")]
    public int? S2Q7 { get; set; }

    [Column("S2_Q8")]
    public int? S2Q8 { get; set; }

    [Column("S2_Q9")]
    public int? S2Q9 { get; set; }

    [Column("S2_Q10")]
    public int? S2Q10 { get; set; }

    [Column("S2_Q11")]
    public int? S2Q11 { get; set; }

    [Column("S2_Q12")]
    public int? S2Q12 { get; set; }

    [Column("S2_Q13")]
    public int? S2Q13 { get; set; }

    [Column("S2_Q14")]
    public int? S2Q14 { get; set; }

    [Column("S2_Q15")]
    public int? S2Q15 { get; set; }

    [Column("S2_Q16")]
    public int? S2Q16 { get; set; }

    [Column("S2_Q17")]
    public int? S2Q17 { get; set; }

    [Column("S2_Q18")]
    public int? S2Q18 { get; set; }

    [Column("S2_Q19")]
    public int? S2Q19 { get; set; }

    [Column("S2_Q20")]
    public int? S2Q20 { get; set; }

    [Column("S2_Q21")]
    public int? S2Q21 { get; set; }

    [Column("S2_Q22")]
    public int? S2Q22 { get; set; }
}
