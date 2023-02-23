using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace FaceIt2023.Models;

[PrimaryKey("UserId", "SessionNumber")]
[Table("Feedback_Forms", Schema = "FaceIt")]
public partial class FeedbackForm
{
    [Key]
    [Column("user_id")]
    public int UserId { get; set; }

    [Key]
    [Column("session_number")]
    public int SessionNumber { get; set; }

    [Column("q1")]
    public int? Q1 { get; set; }

    [Column("q2")]
    public int? Q2 { get; set; }

    [Column("q3")]
    public int? Q3 { get; set; }

    [Column("q4")]
    public int? Q4 { get; set; }

    [Column("q5")]
    public int? Q5 { get; set; }

    [Column("text_entry")]
    [StringLength(255)]
    [Unicode(false)]
    public string? TextEntry { get; set; }
}
