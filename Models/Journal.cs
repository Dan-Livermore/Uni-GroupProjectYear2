using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace FaceIt2023.Models;

[Keyless]
[Table("Journal", Schema = "FaceIt")]
public partial class Journal
{
    [Column("user_id")]
    public int UserId { get; set; }

    [Column("journal_entry")]
    [StringLength(255)]
    [Unicode(false)]
    public string? JournalEntry { get; set; }

    [Column("entry_date")]
    [StringLength(10)]
    [Unicode(false)]
    public string EntryDate { get; set; } = null!;
}
