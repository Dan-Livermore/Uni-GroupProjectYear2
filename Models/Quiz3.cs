using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace FaceIt2023.Models;

[Table("QUIZ3", Schema = "FaceIt")]
public partial class Quiz3
{
    [Key]
    [Column("user_id")]
    public int UserId { get; set; }

    [Column("S3_Q1")]
    public int? S3Q1 { get; set; }

    [Column("S3_Q2")]
    public int? S3Q2 { get; set; }

    [Column("S3_Q3")]
    public int? S3Q3 { get; set; }

    [Column("S3_Q4")]
    public int? S3Q4 { get; set; }

    [Column("S3_Q5")]
    public int? S3Q5 { get; set; }

    [Column("S3_Q6")]
    public int? S3Q6 { get; set; }

    [Column("S3_Q7")]
    public int? S3Q7 { get; set; }

    [Column("S3_Q8")]
    public int? S3Q8 { get; set; }
}
