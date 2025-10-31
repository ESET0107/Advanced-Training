using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace UniversityAppAPI.Models;

public partial class UniversityContext : DbContext
{
    public UniversityContext()
    {
    }

    public UniversityContext(DbContextOptions<UniversityContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Course> Courses { get; set; }

    public virtual DbSet<Student> Students { get; set; }
    public virtual DbSet<User> Users { get; set; }

//    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
//#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
//        => optionsBuilder.UseSqlServer("Data Source=LAPTOP-EBR5I1OJ;Initial Catalog=university;Integrated Security=True;TrustServerCertificate=True");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Course>(entity =>
        {
            entity.HasKey(e => e.CourseId).HasName("PK__Course__C92D71A75D578F3B");

            entity.ToTable("Course");

            entity.HasIndex(e => e.CourseCode, "UQ__Course__FC00E000F11F13ED").IsUnique();

            entity.Property(e => e.CourseCode).HasMaxLength(20);
            entity.Property(e => e.CourseName).HasMaxLength(100);
            entity.Property(e => e.Department).HasMaxLength(50);
        });

        modelBuilder.Entity<Student>(entity =>
        {
            entity.HasKey(e => e.StudentId).HasName("PK__Student__32C52B99AC4B9B31");

            entity.ToTable("Student");

            entity.HasIndex(e => e.RollNumber, "UQ__Student__E9F06F16A1A40A2A").IsUnique();

            entity.Property(e => e.Address).HasMaxLength(200);
            entity.Property(e => e.Email).HasMaxLength(100);
            entity.Property(e => e.Gender).HasMaxLength(10);
            entity.Property(e => e.Name).HasMaxLength(100);
            entity.Property(e => e.Phone).HasMaxLength(15);
            entity.Property(e => e.RollNumber).HasMaxLength(20);

            entity.HasOne(d => d.Course).WithMany(p => p.Students)
                .HasForeignKey(d => d.CourseId).OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK__Student__CourseI__3B75D760");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PK__User__1788CCAC");
            entity.ToTable("User");

            entity.Property(e => e.UserName)
                .HasMaxLength(100)
                .IsRequired();

            entity.Property(e => e.Password)
                .HasMaxLength(255)
                .IsRequired();

            entity.Property(e => e.Role)
                .HasMaxLength(50)
                .IsRequired();
        });


        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
