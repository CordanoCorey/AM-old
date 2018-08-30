using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace AMSuite2.Files.DataClasses
{
    public partial class AMSuiteFilesContext : DbContext
    {
        public virtual DbSet<AnnouncementAttachments> AnnouncementAttachments { get; set; }
        public virtual DbSet<Attachments> Attachments { get; set; }
        public virtual DbSet<BinAttachments> BinAttachments { get; set; }
        public virtual DbSet<Constant> Constant { get; set; }
        public virtual DbSet<TempAnnouncementAttachments> TempAnnouncementAttachments { get; set; }
        public virtual DbSet<TempAttachments> TempAttachments { get; set; }

        public AMSuiteFilesContext(DbContextOptions<AMSuiteFilesContext> options)
            : base(options)
        { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<AnnouncementAttachments>(entity =>
            {
                entity.Property(e => e.AttachmentName)
                    .IsRequired()
                    .HasMaxLength(250);

                entity.Property(e => e.FileContent).IsRequired();

                entity.Property(e => e.FileExtension)
                    .IsRequired()
                    .HasMaxLength(10);

                entity.Property(e => e.MimeType)
                    .IsRequired()
                    .HasMaxLength(250);
            });

            modelBuilder.Entity<Attachments>(entity =>
            {
                entity.HasKey(e => e.AttachmentId)
                    .HasName("Attachments_PK");

                entity.HasIndex(e => e.AgendaId)
                    .HasName("idx_Attachments_AgendaId");

                entity.HasIndex(e => e.AgendaItemId)
                    .HasName("idx_Attachments_AgendaItemId");

                entity.HasIndex(e => e.Key)
                    .HasName("UQ__Attachme__C41E02895C864F73")
                    .IsUnique();

                entity.Property(e => e.AttachmentName)
                    .IsRequired()
                    .HasColumnType("varchar(250)");

                entity.Property(e => e.AttachmentText).HasColumnType("varchar(max)");

                entity.Property(e => e.FileContent).IsRequired();

                entity.Property(e => e.FileExtension)
                    .IsRequired()
                    .HasColumnType("varchar(10)");

                entity.Property(e => e.Key).HasDefaultValueSql("newid()");

                entity.Property(e => e.MimeType)
                    .IsRequired()
                    .HasColumnType("varchar(250)");
            });

            modelBuilder.Entity<BinAttachments>(entity =>
            {
                entity.HasIndex(e => e.Key)
                    .HasName("UQ__BinAttac__C41E028923611B28")
                    .IsUnique();

                entity.Property(e => e.AttachmentName)
                    .IsRequired()
                    .HasColumnType("varchar(250)");

                entity.Property(e => e.FileContent).IsRequired();

                entity.Property(e => e.FileExtension)
                    .IsRequired()
                    .HasColumnType("varchar(10)");

                entity.Property(e => e.Key).HasDefaultValueSql("newid()");

                entity.Property(e => e.MimeType)
                    .IsRequired()
                    .HasColumnType("varchar(250)");
            });

            modelBuilder.Entity<Constant>(entity =>
            {
                entity.Property(e => e.ConstantCode)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(250);
            });

            modelBuilder.Entity<TempAnnouncementAttachments>(entity =>
            {
                entity.HasKey(e => e.TempAttachmentId)
                    .HasName("PK_TempAnnouncementAttachments");

                entity.Property(e => e.AttachmentName)
                    .IsRequired()
                    .HasMaxLength(250);

                entity.Property(e => e.FileContent).IsRequired();

                entity.Property(e => e.FileExtension)
                    .IsRequired()
                    .HasMaxLength(10);

                entity.Property(e => e.MimeType)
                    .IsRequired()
                    .HasMaxLength(250);
            });

            modelBuilder.Entity<TempAttachments>(entity =>
            {
                entity.HasKey(e => e.TempAttachmentId)
                    .HasName("TempAttachments_PK");

                entity.HasIndex(e => e.Key)
                    .HasName("UQ__TempAtta__C41E0289F1E3DA55")
                    .IsUnique();

                entity.HasIndex(e => e.TempAgendaItemId)
                    .HasName("idx_TempAttachments_AgendaItemId");

                entity.Property(e => e.AttachmentName)
                    .IsRequired()
                    .HasColumnType("varchar(250)");

                entity.Property(e => e.FileContent).IsRequired();

                entity.Property(e => e.FileExtension)
                    .IsRequired()
                    .HasColumnType("varchar(10)");

                entity.Property(e => e.IsPrivate).HasDefaultValueSql("0");

                entity.Property(e => e.Key).HasDefaultValueSql("newid()");

                entity.Property(e => e.MimeType)
                    .IsRequired()
                    .HasColumnType("varchar(250)");
            });
        }
    }
}