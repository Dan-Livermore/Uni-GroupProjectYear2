using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace FaceItAPI.Models;

[PrimaryKey("UserId", "EntryDate")]
[Table("Journal", Schema = "FaceIt")]
public partial class Journal
{
    [Key]
    [Column("user_id")]
    public int UserId { get; set; }

    [Column("journal_entry")]
    [StringLength(255)]
    [Unicode(false)]
    public string? JournalEntry { get; set; }

    [Key]
    [Column("entry_date")]
    [StringLength(10)]
    [Unicode(false)]
    public string EntryDate { get; set; } = null!;
}
