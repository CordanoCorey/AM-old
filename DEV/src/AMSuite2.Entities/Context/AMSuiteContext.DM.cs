using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AMSuite2.Entities.DataClasses;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace AMSuite2.Entities.Context
{
    public partial class AMSuiteContext
    {
        public void OnModelCreating_DM(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<AnnouncementAttachment>(entity =>
            {
                entity.Property(e => e.AttachmentName)
                    .IsRequired()
                    .HasMaxLength(250);

                entity.Property(e => e.FileExtension)
                    .IsRequired()
                    .HasMaxLength(10);

                entity.HasOne(d => d.Announcement)
                    .WithMany(p => p.AnnouncementAttachment)
                    .HasForeignKey(d => d.AnnouncementId)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_AnnouncementAttachment_Announcement");
            });

            modelBuilder.Entity<Attachment>(entity =>
            {
                entity.HasIndex(e => e.AgendaItemId)
                    .HasName("cdx_Attachment_AgendaItemId");

                entity.Property(e => e.AttachmentName)
                    .IsRequired()
                    .HasColumnType("varchar(250)");

                entity.Property(e => e.CreatedOn).HasColumnType("datetime");

                entity.Property(e => e.DisplayOrder).HasDefaultValueSql("1");

                entity.Property(e => e.FileExtension)
                    .IsRequired()
                    .HasColumnType("varchar(10)")
                    .HasDefaultValueSql("'1'");

                entity.Property(e => e.IsPrivate).HasDefaultValueSql("0");

                entity.Property(e => e.LastModifiedOn).HasColumnType("datetime");

                entity.HasOne(d => d.AgendaItem)
                    .WithMany(p => p.Attachment)
                    .HasForeignKey(d => d.AgendaItemId)
                    .HasConstraintName("FK_Attachments_AgendaItemData");

                entity.HasOne(d => d.CreatedByNavigation)
                    .WithMany(p => p.AttachmentCreatedByNavigation)
                    .HasForeignKey(d => d.CreatedBy)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_Attachments_AgendaUser");

                entity.HasOne(d => d.LastModifiedByNavigation)
                    .WithMany(p => p.AttachmentLastModifiedByNavigation)
                    .HasForeignKey(d => d.LastModifiedBy)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_Attachments_AgendaUser1");
            });

            modelBuilder.Entity<BinAttachment>(entity =>
            {
                entity.HasIndex(e => e.BinAgendaItemId)
                    .HasName("cdx_BinAttachment_BinAgendaItemId");

                entity.Property(e => e.AttachmentName)
                    .IsRequired()
                    .HasMaxLength(250);

                entity.Property(e => e.FileExtension)
                    .IsRequired()
                    .HasMaxLength(10);

                entity.HasOne(d => d.BinAgendaItem)
                    .WithMany(p => p.BinAttachment)
                    .HasForeignKey(d => d.BinAgendaItemId)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_BinAttachment_BinAgendaItemData");
            });

            modelBuilder.Entity<MailMessageAttachment>(entity =>
            {
                entity.HasIndex(e => e.MailMessageId)
                    .HasName("cdx_MailMessageAttachment_MailMessageId");

                entity.Property(e => e.FileExtension).HasColumnType("varchar(10)");

                entity.Property(e => e.FileName).HasColumnType("varchar(250)");

                entity.Property(e => e.MimeType).HasColumnType("varchar(250)");

                entity.HasOne(d => d.MailMessage)
                    .WithMany(p => p.MailMessageAttachment)
                    .HasForeignKey(d => d.MailMessageId)
                    .HasConstraintName("FK_MailMessageAttachment_MailMessage");
            });

            modelBuilder.Entity<SuggestionAttachmentXref>(entity =>
            {
                entity.HasKey(e => new { e.SuggestionId, e.AttachmentId })
                    .HasName("PK_SuggestionsAttachments");

                entity.ToTable("SuggestionAttachment_xref");

                entity.HasOne(d => d.Attachment)
                    .WithMany(p => p.SuggestionAttachmentXref)
                    .HasForeignKey(d => d.AttachmentId)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_Suggestions_Attachments_xref_Attachments");

                entity.HasOne(d => d.Suggestion)
                    .WithMany(p => p.SuggestionAttachmentXref)
                    .HasForeignKey(d => d.SuggestionId)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_Suggestions_Attachments_xref_Suggestions");
            });
        }
    }
}
