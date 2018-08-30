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
        public void OnModelCreating_Lookup(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<AccountStatusLkp>(entity =>
            {
                entity.ToTable("AccountStatus_lkp");

                entity.Property(e => e.EnumCode)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(150);
            });

            modelBuilder.Entity<AgendaDateRangeLkp>(entity =>
            {
                entity.ToTable("AgendaDateRange_lkp");

                entity.Property(e => e.EnumCode)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(100);
            });

            modelBuilder.Entity<AgendaLkp>(entity =>
            {
                entity.ToTable("Agenda_lkp");

                entity.Property(e => e.AgendaDescription).HasColumnType("varchar(150)");

                entity.Property(e => e.EnumCode)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnType("varchar(50)");
            });

            modelBuilder.Entity<AgendaRecordLkp>(entity =>
            {
                entity.ToTable("AgendaRecord_lkp");

                entity.Property(e => e.EnumCode)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(100);
            });

            modelBuilder.Entity<AnnouncementLkp>(entity =>
            {
                entity.ToTable("Announcement_lkp");

                entity.Property(e => e.EnumCode)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(100);
            });

            modelBuilder.Entity<AttendanceLkp>(entity =>
            {
                entity.ToTable("Attendance_lkp");

                entity.Property(e => e.EnumCode)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnType("varchar(50)");
            });

            modelBuilder.Entity<AutoSaveResolutionLkp>(entity =>
            {
                entity.ToTable("AutoSaveResolution_lkp");

                entity.Property(e => e.Description)
                    .IsRequired()
                    .HasColumnType("varchar(max)");

                entity.Property(e => e.EnumCode)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnType("varchar(30)");
            });

            modelBuilder.Entity<GroupRoleLkp>(entity =>
            {
                entity.ToTable("GroupRole_lkp");

                entity.Property(e => e.EnumCode)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.GroupRoleDescription).HasMaxLength(500);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(150);
            });

            modelBuilder.Entity<MeetingLkp>(entity =>
            {
                entity.ToTable("Meeting_lkp");

                entity.Property(e => e.EnumCode)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(150);
            });

            modelBuilder.Entity<NotificationStatusLkp>(entity =>
            {
                entity.ToTable("NotificationStatus_lkp");

                entity.Property(e => e.Status)
                    .IsRequired()
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<NotificationTypeLkp>(entity =>
            {
                entity.ToTable("NotificationType_lkp");

                entity.Property(e => e.Type)
                    .IsRequired()
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<OutlineLkp>(entity =>
            {
                entity.ToTable("Outline_lkp");

                entity.Property(e => e.EnumCode)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<RoleLkp>(entity =>
            {
                entity.ToTable("Role_lkp");

                entity.Property(e => e.Description).HasMaxLength(500);

                entity.Property(e => e.EnumCode)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(150);
            });

            modelBuilder.Entity<StatusLkp>(entity =>
            {
                entity.ToTable("Status_lkp");

                entity.Property(e => e.EnumCode)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnType("varchar(20)");
            });

            modelBuilder.Entity<TemplateLkp>(entity =>
            {
                entity.ToTable("Template_lkp");

                entity.Property(e => e.EnumCode)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnType("varchar(100)");

                entity.Property(e => e.TemplateDescription).HasColumnType("varchar(250)");
            });

            modelBuilder.Entity<TimeFrameLkp>(entity =>
            {
                entity.ToTable("TimeFrame_lkp");

                entity.Property(e => e.EnumCode)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnType("varchar(25)");

                entity.Property(e => e.TimeFrameDescription).HasColumnType("varchar(50)");
            });

            modelBuilder.Entity<VoteAnswerLkp>(entity =>
            {
                entity.ToTable("VoteAnswer_lkp");

                entity.Property(e => e.EnumCode)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnType("varchar(20)");
            });
        }
    }
}
