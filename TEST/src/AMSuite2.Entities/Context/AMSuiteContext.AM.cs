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
        public void OnModelCreating_AM(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Agenda>(entity =>
            {
                entity.HasIndex(e => e.GroupId)
                    .HasName("idx_Agenda_GroupId");

                entity.HasIndex(e => e.MeetingId)
                    .HasName("cdx_Agenda_MeetingId");

                entity.Property(e => e.AgendaDate).HasColumnType("date");

                entity.Property(e => e.AgendaDescription).HasColumnType("varchar(max)");

                entity.Property(e => e.AgendaName)
                    .IsRequired()
                    .HasColumnType("varchar(150)");

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.DisplayMinutes).HasDefaultValueSql("0");

                entity.Property(e => e.LastModifiedDate).HasColumnType("datetime");

                entity.Property(e => e.MarkedForDelete).HasColumnType("datetime");

                entity.Property(e => e.RollcallTaken).HasDefaultValueSql("0");

                entity.HasOne(d => d.AgendaType)
                    .WithMany(p => p.Agenda)
                    .HasForeignKey(d => d.AgendaTypeId)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_Agendas_AgendaTypes");

                entity.HasOne(d => d.CreatedByNavigation)
                    .WithMany(p => p.AgendaCreatedByNavigation)
                    .HasForeignKey(d => d.CreatedBy)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_Agendas_AgendaUser");

                entity.HasOne(d => d.Group)
                    .WithMany(p => p.Agenda)
                    .HasForeignKey(d => d.GroupId)
                    .HasConstraintName("FK_Agendas_Groups");

                entity.HasOne(d => d.LastModifiedByNavigation)
                    .WithMany(p => p.AgendaLastModifiedByNavigation)
                    .HasForeignKey(d => d.LastModifiedBy)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_Agendas_AgendaUser1");

                entity.HasOne(d => d.Meeting)
                    .WithMany(p => p.Agenda)
                    .HasForeignKey(d => d.MeetingId)
                    .HasConstraintName("FK_Agendas_Meetings");

                entity.HasOne(d => d.Status)
                    .WithMany(p => p.Agenda)
                    .HasForeignKey(d => d.StatusId)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_Agendas_Status");

                entity.HasOne(d => d.TimeFrame)
                    .WithMany(p => p.Agenda)
                    .HasForeignKey(d => d.TimeFrameId)
                    .HasConstraintName("FK_Agendas_TimeFrames");
            });

            modelBuilder.Entity<AgendaItemData>(entity =>
            {
                entity.HasIndex(e => e.AgendaId)
                    .HasName("cdx_AgendaItemData_AgendaId");

                entity.HasIndex(e => e.ParentItemId)
                    .HasName("idx_AgendaItemData_ParentItemId");

                entity.Property(e => e.AgendaItemDescription).HasColumnType("varchar(max)");

                entity.Property(e => e.AgendaItemName)
                    .IsRequired()
                    .HasColumnType("varchar(150)");

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.IsVotable).HasDefaultValueSql("0");

                entity.Property(e => e.LastModifiedDate).HasColumnType("datetime");

                entity.Property(e => e.StatusId).HasDefaultValueSql("1");

                entity.HasOne(d => d.Agenda)
                    .WithMany(p => p.AgendaItemData)
                    .HasForeignKey(d => d.AgendaId)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_AgendaItemData_Agendas");

                entity.HasOne(d => d.CreatedByNavigation)
                    .WithMany(p => p.AgendaItemDataCreatedByNavigation)
                    .HasForeignKey(d => d.CreatedBy)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_AgendaItemData_AgendaUser");

                entity.HasOne(d => d.LastModifiedByNavigation)
                    .WithMany(p => p.AgendaItemDataLastModifiedByNavigation)
                    .HasForeignKey(d => d.LastModifiedBy)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_AgendaItemData_AgendaUser1");

                entity.HasOne(d => d.ParentItem)
                    .WithMany(p => p.InverseParentItem)
                    .HasForeignKey(d => d.ParentItemId)
                    .HasConstraintName("FK_AgendaItemData_Parent");

                entity.HasOne(d => d.Status)
                    .WithMany(p => p.AgendaItemData)
                    .HasForeignKey(d => d.StatusId)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_AgendaItemData_Status");
            });

            modelBuilder.Entity<AgendaItemVote>(entity =>
            {
                entity.HasIndex(e => e.AgendaItemId)
                    .HasName("cdx_AgendaItemVote_AgendaItemId");

                entity.Property(e => e.CreatedOn)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("getdate()");

                entity.Property(e => e.LastModifiedOn)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("getdate()");

                entity.HasOne(d => d.AgendaItem)
                    .WithMany(p => p.AgendaItemVote)
                    .HasForeignKey(d => d.AgendaItemId)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_AgendaItemVotes_AgendaItemData");

                entity.HasOne(d => d.CreatedByNavigation)
                    .WithMany(p => p.AgendaItemVoteCreatedByNavigation)
                    .HasForeignKey(d => d.CreatedBy)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_AgendaItemVotes_AgendaUser1");

                entity.HasOne(d => d.LastModifiedByNavigation)
                    .WithMany(p => p.AgendaItemVoteLastModifiedByNavigation)
                    .HasForeignKey(d => d.LastModifiedBy)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_AgendaItemVotes_AgendaUser2");

                entity.HasOne(d => d.VoteAnswer)
                    .WithMany(p => p.AgendaItemVote)
                    .HasForeignKey(d => d.VoteAnswerId)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_AgendaItemVotes_VoteAnswers_lkp");

                entity.HasOne(d => d.Voter)
                    .WithMany(p => p.AgendaItemVoteVoter)
                    .HasForeignKey(d => d.VoterId)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_AgendaItemVotes_AgendaUser");
            });

            modelBuilder.Entity<AgendaRecord>(entity =>
            {
                entity.HasIndex(e => e.AgendaItemId)
                    .HasName("cdx_AgendaRecord_AgendaItemId");

                entity.Property(e => e.AgendaRecord1)
                    .IsRequired()
                    .HasColumnName("AgendaRecord");

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.LastModifiedDate).HasColumnType("datetime");

                entity.HasOne(d => d.AgendaItem)
                    .WithMany(p => p.AgendaRecord)
                    .HasForeignKey(d => d.AgendaItemId)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_AgendaRecord_AgendaItemData");

                entity.HasOne(d => d.AgendaRecordType)
                    .WithMany(p => p.AgendaRecord)
                    .HasForeignKey(d => d.AgendaRecordTypeId)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_AgendaRecord_AgendaRecordType_Lkp");

                entity.HasOne(d => d.CreatedbyNavigation)
                    .WithMany(p => p.AgendaRecordCreatedbyNavigation)
                    .HasForeignKey(d => d.Createdby)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_AgendaRecord_AgendaUser");

                entity.HasOne(d => d.LastModifiedByNavigation)
                    .WithMany(p => p.AgendaRecordLastModifiedByNavigation)
                    .HasForeignKey(d => d.LastModifiedBy)
                    .HasConstraintName("FK_AgendaRecord_AgendaUser1");
            });

            modelBuilder.Entity<BinAgendaItemData>(entity =>
            {
                entity.HasIndex(e => e.ParentItemId)
                    .HasName("idx_BinAgendaItemData_ParentItemId");

                entity.HasIndex(e => e.UserId)
                    .HasName("cdx_BinAgendaItemData_UserId");

                entity.Property(e => e.AgendaItemName)
                    .IsRequired()
                    .HasMaxLength(150);

                entity.HasOne(d => d.Account)
                    .WithMany(p => p.BinAgendaItemData)
                    .HasForeignKey(d => d.AccountId)
                    .HasConstraintName("FK_Account_BinAgendaItemData");

                entity.HasOne(d => d.ParentItem)
                    .WithMany(p => p.InverseParentItem)
                    .HasForeignKey(d => d.ParentItemId)
                    .HasConstraintName("FK_BinAgendaItemData_Parent");

                entity.HasOne(d => d.Status)
                    .WithMany(p => p.BinAgendaItemData)
                    .HasForeignKey(d => d.StatusId)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_BinAgendaItemData_Status_lkp");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.BinAgendaItemData)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_BinAgendaItemData_User");
            });

            modelBuilder.Entity<BinAgendaRecord>(entity =>
            {
                entity.HasIndex(e => e.BinAgendaItemId)
                    .HasName("cdx_BinAgendaRecord_BinAgendaItemId");

                entity.Property(e => e.AgendaRecord).IsRequired();

                entity.HasOne(d => d.AgendaRecordType)
                    .WithMany(p => p.BinAgendaRecord)
                    .HasForeignKey(d => d.AgendaRecordTypeId)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_BinAgendaRecord_AgendaRecord_lkp");

                entity.HasOne(d => d.BinAgendaItem)
                    .WithMany(p => p.BinAgendaRecord)
                    .HasForeignKey(d => d.BinAgendaItemId)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_BinAgendaRecord_BinAgendaItemData");
            });

            modelBuilder.Entity<Meeting>(entity =>
            {
                entity.HasIndex(e => e.AccountId)
                    .HasName("cdx_Meeting_AccountId");

                entity.HasIndex(e => e.GroupId)
                    .HasName("idx_Meeting_GroupId");

                entity.HasIndex(e => e.MeetingDate)
                    .HasName("idx_Meeting_MeetingDate");

                entity.Property(e => e.Comments).HasColumnType("varchar(500)");

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.LastModifiedDate).HasColumnType("datetime");

                entity.Property(e => e.MarkedForDelete).HasColumnType("datetime");

                entity.Property(e => e.MeetingDate).HasColumnType("date");

                entity.Property(e => e.MeetingLocation).HasColumnType("varchar(250)");

                entity.Property(e => e.MeetingName)
                    .IsRequired()
                    .HasColumnType("varchar(75)");

                entity.HasOne(d => d.Account)
                    .WithMany(p => p.Meeting)
                    .HasForeignKey(d => d.AccountId)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_Meetings_Accounts");

                entity.HasOne(d => d.AttendanceTaker)
                    .WithMany(p => p.MeetingAttendanceTaker)
                    .HasForeignKey(d => d.AttendanceTakerId)
                    .HasConstraintName("FK_Meeting_User1");

                entity.HasOne(d => d.CreatedByNavigation)
                    .WithMany(p => p.MeetingCreatedByNavigation)
                    .HasForeignKey(d => d.CreatedBy)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_Meetings_AgendaUser");

                entity.HasOne(d => d.Group)
                    .WithMany(p => p.Meeting)
                    .HasForeignKey(d => d.GroupId)
                    .HasConstraintName("FK_Meetings_Groups");

                entity.HasOne(d => d.LastModifiedByNavigation)
                    .WithMany(p => p.MeetingLastModifiedByNavigation)
                    .HasForeignKey(d => d.LastModifiedBy)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_Meetings_AgendaUser1");

                entity.HasOne(d => d.MeetingType)
                    .WithMany(p => p.Meeting)
                    .HasForeignKey(d => d.MeetingTypeId)
                    .HasConstraintName("FK_Meetings_MeetingType_Lkp");

                entity.HasOne(d => d.MinuteTaker)
                    .WithMany(p => p.MeetingMinuteTaker)
                    .HasForeignKey(d => d.MinuteTakerId)
                    .HasConstraintName("FK_Meeting_User");

                entity.HasOne(d => d.Outline)
                    .WithMany(p => p.Meeting)
                    .HasForeignKey(d => d.OutlineId)
                    .HasConstraintName("FK_Meeting_Outline_lkp");

                entity.HasOne(d => d.Status)
                    .WithMany(p => p.Meeting)
                    .HasForeignKey(d => d.StatusId)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_Meetings_Status");

                entity.HasOne(d => d.VoteTaker)
                    .WithMany(p => p.MeetingVoteTaker)
                    .HasForeignKey(d => d.VoteTakerId)
                    .HasConstraintName("FK_Meeting_User2");
            });

            modelBuilder.Entity<Suggestion>(entity =>
            {
                entity.HasIndex(e => e.AgendaId)
                    .HasName("cdx_Suggestion_AgendaId");

                entity.HasIndex(e => e.CreatedBy)
                    .HasName("idx_Suggestion_CreatedBy");

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.LastModifiedDate).HasColumnType("datetime");

                entity.Property(e => e.SuggestionDescription).HasColumnType("varchar(max)");

                entity.Property(e => e.SuggestionName)
                    .IsRequired()
                    .HasColumnType("varchar(150)");

                entity.HasOne(d => d.Agenda)
                    .WithMany(p => p.Suggestion)
                    .HasForeignKey(d => d.AgendaId)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_Suggestions_Agenda");

                entity.HasOne(d => d.CreatedByNavigation)
                    .WithMany(p => p.SuggestionCreatedByNavigation)
                    .HasForeignKey(d => d.CreatedBy)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_Suggestions_AgendaUser");

                entity.HasOne(d => d.LastModifiedByNavigation)
                    .WithMany(p => p.SuggestionLastModifiedByNavigation)
                    .HasForeignKey(d => d.LastModifiedBy)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_Suggestions_AgendaUser1");
            });

            modelBuilder.Entity<Template>(entity =>
            {
                entity.HasIndex(e => e.CreatedBy)
                    .HasName("cdx_Template_CreatedBy");

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.TemplateDescription).HasColumnType("varchar(max)");

                entity.Property(e => e.TemplateName)
                    .IsRequired()
                    .HasColumnType("varchar(100)");

                entity.Property(e => e.UpdatedDate).HasColumnType("datetime");

                entity.HasOne(d => d.CreatedByNavigation)
                    .WithMany(p => p.TemplateCreatedByNavigation)
                    .HasForeignKey(d => d.CreatedBy)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_Templates_AgendaUser");

                entity.HasOne(d => d.Group)
                    .WithMany(p => p.Template)
                    .HasForeignKey(d => d.GroupId)
                    .HasConstraintName("FK_Template_Group");

                entity.HasOne(d => d.Status)
                    .WithMany(p => p.Template)
                    .HasForeignKey(d => d.StatusId)
                    .HasConstraintName("FK_Template_Status_lkp");

                entity.HasOne(d => d.TemplateType)
                    .WithMany(p => p.Template)
                    .HasForeignKey(d => d.TemplateTypeId)
                    .HasConstraintName("FK_Templates_TemplateTypes");

                entity.HasOne(d => d.TimeFrame)
                    .WithMany(p => p.Template)
                    .HasForeignKey(d => d.TimeFrameId)
                    .HasConstraintName("FK_Template_TimeFrame_lkp");

                entity.HasOne(d => d.UpdatedByNavigation)
                    .WithMany(p => p.TemplateUpdatedByNavigation)
                    .HasForeignKey(d => d.UpdatedBy)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_Templates_AgendaUser1");
            });

            modelBuilder.Entity<TemplateItem>(entity =>
            {
                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.TemplateItemDate).HasColumnType("datetime");

                entity.Property(e => e.TemplateItemDescription).HasColumnType("varchar(max)");

                entity.Property(e => e.TemplateItemName)
                    .IsRequired()
                    .HasColumnType("varchar(150)");

                entity.Property(e => e.UpdatedDate).HasColumnType("datetime");

                entity.HasOne(d => d.CreatedByNavigation)
                    .WithMany(p => p.TemplateItemCreatedByNavigation)
                    .HasForeignKey(d => d.CreatedBy)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_TemplateItems_AgendaUser");

                entity.HasOne(d => d.ParentItem)
                    .WithMany(p => p.InverseParentItem)
                    .HasForeignKey(d => d.ParentItemId)
                    .HasConstraintName("FK_TemplateItems_TemplateItems");

                entity.HasOne(d => d.Template)
                    .WithMany(p => p.TemplateItem)
                    .HasForeignKey(d => d.TemplateId)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_TemplateItems_Templates");

                entity.HasOne(d => d.UpdatedByNavigation)
                    .WithMany(p => p.TemplateItemUpdatedByNavigation)
                    .HasForeignKey(d => d.UpdatedBy)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_TemplateItems_AgendaUser1");
            });
        }
    }
}
