using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using FaceItAPI.Models;

namespace FaceItAPI.Models;

public partial class Comp2003ZContext : DbContext
{
    public Comp2003ZContext()
    {
    }

    public Comp2003ZContext(DbContextOptions<Comp2003ZContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Account> Accounts { get; set; }

    public virtual DbSet<IdByEmailAndPassword> IdByEmailAndPassword { get; set; }

    public virtual DbSet<IdByEmailAndPasswordResult> IdByEmailAndPasswordResult { get; set; }

    //public virtual DbSet<HealthProfAllocatedInput> HealthProfAllocatedInput { get; set; }
    public virtual DbSet<HealthProfAllocatedOutput> HealthProfAllocatedOutput { get; set; }

    public virtual DbSet<FeedbackForm> FeedbackForms { get; set; }

    public virtual DbSet<HealthProfUser> HealthProfUsers { get; set; }

    public virtual DbSet<Journal> Journals { get; set; }

    public virtual DbSet<Quiz1> Quiz1s { get; set; }

    public virtual DbSet<Quiz2> Quiz2s { get; set; }

    public virtual DbSet<Quiz3> Quiz3s { get; set; }

    public virtual DbSet<Quiz4> Quiz4s { get; set; }

    public virtual DbSet<Quiz5> Quiz5s { get; set; }

    //    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    //#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
    //        => optionsBuilder.UseSqlServer("Server=socem1.uopnet.plymouth.ac.uk;Database=COMP2003_Z ; User Id=COMP2003_Z; Password=YpaS798+ ; TrustServerCertificate=True");
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        IConfigurationRoot configuration = new ConfigurationBuilder()
            .SetBasePath(AppDomain.CurrentDomain.BaseDirectory)
            .AddJsonFile("appsettings.json")
            .Build();

        string connectionString = configuration.GetConnectionString("MyConnectionString");

        optionsBuilder.UseSqlServer(connectionString);
    }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        //modelBuilder.Entity<IdByEmailAndPassword>()
        //.HasNoKey();

        modelBuilder.Entity<Account>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PK__Accounts__B9BE370FAD06A777");
        });

        modelBuilder.Entity<FeedbackForm>(entity =>
        {
            entity.HasKey(e => new { e.UserId, e.SessionNumber }).HasName("FeedbackCompositeKey");
        });

        modelBuilder.Entity<HealthProfUser>(entity =>
        {
            entity.HasKey(e => new { e.ProfId, e.UserId }).HasName("AssignedUsers");
        });

        modelBuilder.Entity<Journal>(entity =>
        {
            entity.HasKey(e => new { e.UserId, e.EntryDate }).HasName("UserPostsByDate");
        });

        modelBuilder.Entity<Quiz1>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PK__QUIZ1__B9BE370FC884CEB5");

            entity.Property(e => e.UserId).ValueGeneratedNever();
        });

        modelBuilder.Entity<Quiz2>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PK__QUIZ2__B9BE370F2B45D88F");

            entity.Property(e => e.UserId).ValueGeneratedNever();
        });

        modelBuilder.Entity<Quiz3>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PK__QUIZ3__B9BE370FC55B4932");

            entity.Property(e => e.UserId).ValueGeneratedNever();
        });

        modelBuilder.Entity<Quiz4>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PK__QUIZ4__B9BE370FA011788A");

            entity.Property(e => e.UserId).ValueGeneratedNever();
        });

        modelBuilder.Entity<Quiz5>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PK__QUIZ5__B9BE370FEF142754");

            entity.Property(e => e.UserId).ValueGeneratedNever();
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);

    public DbSet<FaceItAPI.Models.HealthProfAllocatedInput> HealthProfAllocatedInput { get; set; } = default!;
}
