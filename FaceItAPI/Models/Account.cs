using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;

namespace FaceItAPI.Models;

[Table("Accounts", Schema = "FaceIt")]
public partial class Account
{
    [Key]
    [Column("user_id")]
    [JsonIgnore]
    public int UserId { get; set; }

    [Column("user_email")]
    [StringLength(100)]
    [Unicode(false)]
    public string UserEmail { get; set; } = null!;

    [Column("user_password")]
    [StringLength(100)]
    [Unicode(false)]
    public string UserPassword { get; set; } = null!;

    [Column("privilege_level")]
    public int PrivilegeLevel { get; set; }

    [Column("forename")]
    [StringLength(80)]
    [Unicode(false)]
    public string? Forename { get; set; }

    [Column("surname")]
    [StringLength(80)]
    [Unicode(false)]
    public string? Surname { get; set; }
}
