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
        public void OnModelCreating_Core(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Account>(entity =>
            {
                entity.HasIndex(e => e.Urlbase)
                    .HasName("UX_Account_URLBase")
                    .IsUnique();

                entity.Property(e => e.AccountDescription).HasColumnType("varchar(max)");

                entity.Property(e => e.AccountName)
                    .IsRequired()
                    .HasColumnType("varchar(75)");

                entity.Property(e => e.MailAgendaTemplate)
                    .HasColumnType("varchar(max)")
                    .HasDefaultValueSql("'<p>&lt;% MessageFrom %&gt; has shared with you agenda details from the meeting \"&lt;% MeetingName %&gt;\" held on &lt;% MeetingDate %&gt;.  The Agenda is located at the following url: </p>'");

                entity.Property(e => e.MailItemTemplate)
                    .HasColumnType("varchar(max)")
                    .HasDefaultValueSql("'&lt;% MessageFrom %&gt; has shared with you agenda details from the meeting \"&lt;% MeetingName %&gt;\" held on &lt;% MeetingDate %&gt;.<br/>  The agenda details are included in the attached PDF.'");

                entity.Property(e => e.TrialPeriodEndDate).HasColumnType("date");

                entity.Property(e => e.TrialPeriodStartDate).HasColumnType("date");

                entity.Property(e => e.Urlbase)
                    .IsRequired()
                    .HasColumnName("URLBase")
                    .HasColumnType("varchar(50)");

                entity.HasOne(d => d.AccountStatus)
                    .WithMany(p => p.Account)
                    .HasForeignKey(d => d.AccountStatusId)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_Accounts_AccountStatus_Lkp");
            });

            modelBuilder.Entity<AccountLogo>(entity =>
            {
                entity.Property(e => e.CreatedOn)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("getdate()");

                entity.Property(e => e.FileBinary).IsRequired();

                entity.Property(e => e.FileExtension)
                    .IsRequired()
                    .HasColumnType("varchar(10)");

                entity.Property(e => e.FileName)
                    .IsRequired()
                    .HasColumnType("varchar(250)");

                entity.Property(e => e.MimeType)
                    .IsRequired()
                    .HasColumnType("varchar(250)");

                entity.HasOne(d => d.Account)
                    .WithMany(p => p.AccountLogo)
                    .HasForeignKey(d => d.AccountId)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_AccountLogo_Account");

                entity.HasOne(d => d.CreatedByNavigation)
                    .WithMany(p => p.AccountLogo)
                    .HasForeignKey(d => d.CreatedBy)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_AccountLogo_AgendaUser");
            });

            modelBuilder.Entity<AccountUserRoleXref>(entity =>
            {
                entity.HasKey(e => new { e.AccountId, e.UserId })
                    .HasName("PK_AccountUser");

                entity.ToTable("AccountUserRole_xref");

                entity.HasOne(d => d.Account)
                    .WithMany(p => p.AccountUserRoleXref)
                    .HasForeignKey(d => d.AccountId)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_UserAccountRole_xref_Account");

                entity.HasOne(d => d.Role)
                    .WithMany(p => p.AccountUserRoleXref)
                    .HasForeignKey(d => d.RoleId)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_AgendaUser_Role_xref_AgendaRole");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.AccountUserRoleXref)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_AgendaUser_Role_xref_AgendaUser");
            });

            modelBuilder.Entity<Announcement>(entity =>
            {
                entity.HasIndex(e => e.AccountId)
                    .HasName("cdx_Announcement_AccountId");

                entity.Property(e => e.Announcement1)
                    .IsRequired()
                    .HasColumnName("Announcement")
                    .HasMaxLength(2000);

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.EndDate).HasColumnType("date");

                entity.Property(e => e.LastModifiedOn).HasColumnType("date");

                entity.Property(e => e.StartDate).HasColumnType("date");

                entity.Property(e => e.Subject).HasMaxLength(200);

                entity.HasOne(d => d.Account)
                    .WithMany(p => p.Announcement)
                    .HasForeignKey(d => d.AccountId)
                    .HasConstraintName("FK_Announcements_Accounts");

                entity.HasOne(d => d.AnnouncementType)
                    .WithMany(p => p.Announcement)
                    .HasForeignKey(d => d.AnnouncementTypeId)
                    .HasConstraintName("FK_Announcements_AnnouncementType_Lkp");

                entity.HasOne(d => d.CreatedByNavigation)
                    .WithMany(p => p.AnnouncementCreatedByNavigation)
                    .HasForeignKey(d => d.CreatedBy)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_Announcements_AgendaUser");

                entity.HasOne(d => d.LastModifiedByNavigation)
                    .WithMany(p => p.AnnouncementLastModifiedByNavigation)
                    .HasForeignKey(d => d.LastModifiedBy)
                    .HasConstraintName("FK_Announcements_AgendaUser1");
            });

            modelBuilder.Entity<Attendance>(entity =>
            {
                entity.Property(e => e.AttendanceTypeId).HasDefaultValueSql("1");

                entity.Property(e => e.CreatedOn)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("getdate()");

                entity.Property(e => e.IsPresent).HasDefaultValueSql("1");

                entity.Property(e => e.WriteInAttendees).HasColumnType("varchar(1000)");

                entity.HasOne(d => d.Agenda)
                    .WithMany(p => p.Attendance)
                    .HasForeignKey(d => d.AgendaId)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_Attendance_Agenda");

                entity.HasOne(d => d.AgendaUser)
                    .WithMany(p => p.AttendanceAgendaUser)
                    .HasForeignKey(d => d.AgendaUserId)
                    .HasConstraintName("FK_Attendance_AgendaUser");

                entity.HasOne(d => d.AttendanceType)
                    .WithMany(p => p.Attendance)
                    .HasForeignKey(d => d.AttendanceTypeId)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_Attendance_AttendanceTypes");

                entity.HasOne(d => d.CreatedByNavigation)
                    .WithMany(p => p.AttendanceCreatedByNavigation)
                    .HasForeignKey(d => d.CreatedBy)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_Attendance_AgendaUser1");

                entity.HasOne(d => d.Meeting)
                    .WithMany(p => p.Attendance)
                    .HasForeignKey(d => d.MeetingId)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_Attendance_Meetings");
            });

            modelBuilder.Entity<AutoSave>(entity =>
            {
                entity.Property(e => e.AutoSaveText).HasColumnType("varchar(max)");

                entity.Property(e => e.CreatedDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("getdate()");

                entity.Property(e => e.ModifiedDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("getdate()");

                entity.Property(e => e.OriginalText).HasColumnType("varchar(max)");

                entity.Property(e => e.PageUrl)
                    .IsRequired()
                    .HasColumnName("PageURL")
                    .HasColumnType("varchar(200)");

                entity.Property(e => e.ResolutionId).HasDefaultValueSql("1");

                entity.Property(e => e.RichTextBoxId)
                    .IsRequired()
                    .HasColumnType("varchar(200)");

                entity.HasOne(d => d.AgendaUser)
                    .WithMany(p => p.AutoSave)
                    .HasForeignKey(d => d.AgendaUserId)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_AutoSave_AgendaUser");

                entity.HasOne(d => d.Resolution)
                    .WithMany(p => p.AutoSave)
                    .HasForeignKey(d => d.ResolutionId)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_AutoSave_AutoSaveResolutions");
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

            modelBuilder.Entity<Group>(entity =>
            {
                entity.HasIndex(e => e.AccountId)
                    .HasName("cdx_Group_AccountId");

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.GroupName)
                    .IsRequired()
                    .HasMaxLength(150);

                entity.Property(e => e.LastModifiedDate).HasColumnType("datetime");

                entity.HasOne(d => d.Account)
                    .WithMany(p => p.Group)
                    .HasForeignKey(d => d.AccountId)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_Groups_Accounts");

                entity.HasOne(d => d.CreatedByNavigation)
                    .WithMany(p => p.GroupCreatedByNavigation)
                    .HasForeignKey(d => d.CreatedBy)
                    .HasConstraintName("FK_Groups_AgendaUser");

                entity.HasOne(d => d.GroupAdministrator)
                    .WithMany(p => p.GroupGroupAdministrator)
                    .HasForeignKey(d => d.GroupAdministratorId)
                    .HasConstraintName("FK_Group_User");

                entity.HasOne(d => d.LastModifiedByNavigation)
                    .WithMany(p => p.GroupLastModifiedByNavigation)
                    .HasForeignKey(d => d.LastModifiedBy)
                    .HasConstraintName("FK_Groups_AgendaUser1");

                entity.HasOne(d => d.Outline)
                    .WithMany(p => p.Group)
                    .HasForeignKey(d => d.OutlineId)
                    .HasConstraintName("FK_Group_Outline_lkp");
            });

            modelBuilder.Entity<GroupMembershipXref>(entity =>
            {
                entity.HasKey(e => new { e.AgendaUserId, e.GroupId, e.GroupRoleId })
                    .HasName("PK_GroupMemberShip");

                entity.ToTable("GroupMembership_xref");

                entity.HasOne(d => d.AgendaUser)
                    .WithMany(p => p.GroupMembershipXref)
                    .HasForeignKey(d => d.AgendaUserId)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_GroupMembership_xref_AgendaUser");

                entity.HasOne(d => d.Group)
                    .WithMany(p => p.GroupMembershipXref)
                    .HasForeignKey(d => d.GroupId)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_GroupMembership_xref_Groups");

                entity.HasOne(d => d.GroupRole)
                    .WithMany(p => p.GroupMembershipXref)
                    .HasForeignKey(d => d.GroupRoleId)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_GroupMembership_xref_Group_Role_lkp");
            });

            modelBuilder.Entity<GroupRoleSubstitutionXref>(entity =>
            {
                entity.HasKey(e => new { e.AgendaId, e.AgendaUserId, e.GroupRoleId })
                    .HasName("PK_GroupRoleSubstitution");

                entity.ToTable("GroupRoleSubstitution_xref");

                entity.HasOne(d => d.Agenda)
                    .WithMany(p => p.GroupRoleSubstitutionXref)
                    .HasForeignKey(d => d.AgendaId)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_GroupRole_Substitution_xref_Agendas");

                entity.HasOne(d => d.AgendaUser)
                    .WithMany(p => p.GroupRoleSubstitutionXref)
                    .HasForeignKey(d => d.AgendaUserId)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_GroupRole_Substitution_xref_AgendaUser");

                entity.HasOne(d => d.GroupRole)
                    .WithMany(p => p.GroupRoleSubstitutionXref)
                    .HasForeignKey(d => d.GroupRoleId)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_GroupRole_Substitution_xref_Group_Role_lkp");
            });

            modelBuilder.Entity<MailMessage>(entity =>
            {
                entity.Property(e => e.Body).IsRequired();

                entity.Property(e => e.CreationDateTime).HasColumnType("datetime");

                entity.Property(e => e.Failed).HasMaxLength(2000);

                entity.Property(e => e.From).HasMaxLength(100);

                entity.Property(e => e.SentDate).HasColumnType("datetime");

                entity.Property(e => e.Subject)
                    .IsRequired()
                    .HasMaxLength(250);

                entity.Property(e => e.To).IsRequired();
            });

            modelBuilder.Entity<Notification>(entity =>
            {
                entity.HasIndex(e => e.AccountId)
                    .HasName("cdx_Notification_AccountId");

                entity.HasIndex(e => e.GroupId)
                    .HasName("idx_Notification_GroupId");

                entity.HasIndex(e => e.UserId)
                    .HasName("idx_Notification_UserId");

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.HasOne(d => d.Account)
                    .WithMany(p => p.Notification)
                    .HasForeignKey(d => d.AccountId)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_Notification_Account");

                entity.HasOne(d => d.CreatedByNavigation)
                    .WithMany(p => p.NotificationCreatedByNavigation)
                    .HasForeignKey(d => d.CreatedBy)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_Notification_CreatedBy");

                entity.HasOne(d => d.Group)
                    .WithMany(p => p.Notification)
                    .HasForeignKey(d => d.GroupId)
                    .HasConstraintName("FK_Notification_Group");

                entity.HasOne(d => d.LinkedNotification)
                    .WithMany(p => p.InverseLinkedNotification)
                    .HasForeignKey(d => d.LinkedNotificationId)
                    .HasConstraintName("FK_Notification_Notification");

                entity.HasOne(d => d.ResolvedByNavigation)
                    .WithMany(p => p.NotificationResolvedByNavigation)
                    .HasForeignKey(d => d.ResolvedBy)
                    .HasConstraintName("FK_Notification_ResolvedBy");

                entity.HasOne(d => d.Status)
                    .WithMany(p => p.Notification)
                    .HasForeignKey(d => d.StatusId)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_Notification_NotificationStatus_lkp");

                entity.HasOne(d => d.Type)
                    .WithMany(p => p.Notification)
                    .HasForeignKey(d => d.TypeId)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_Notification_NotificationType_lkp");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.NotificationUser)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK_Notification_User");
            });

            modelBuilder.Entity<NotificationAccountRequestXref>(entity =>
            {
                entity.ToTable("NotificationAccountRequest_xref");

                entity.HasOne(d => d.Notification)
                    .WithMany(p => p.NotificationAccountRequestXref)
                    .HasForeignKey(d => d.NotificationId)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_NotificationAccountRequest_xref_Notification");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.NotificationAccountRequestXref)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_NotificationAccountRequest_xref_User");
            });

            modelBuilder.Entity<NotificationSuggestedItemXref>(entity =>
            {
                entity.ToTable("NotificationSuggestedItem_xref");

                entity.HasOne(d => d.AgendaItem)
                    .WithMany(p => p.NotificationSuggestedItemXref)
                    .HasForeignKey(d => d.AgendaItemId)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_NotificationSuggestedItem_xref_AgendaItemData");

                entity.HasOne(d => d.Notification)
                    .WithMany(p => p.NotificationSuggestedItemXref)
                    .HasForeignKey(d => d.NotificationId)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_NotificationSuggestedItem_xref_Notification");
            });

            modelBuilder.Entity<SysAdminAnnouncement>(entity =>
            {
                entity.HasKey(e => e.Lock)
                    .HasName("PK_SysAdminAnnouncement");

                entity.Property(e => e.Lock)
                    .HasColumnType("char(1)")
                    .HasDefaultValueSql("'X'");

                entity.Property(e => e.Announcement)
                    .IsRequired()
                    .HasMaxLength(2000);

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.EndDate).HasColumnType("date");

                entity.Property(e => e.LastModifiedDate).HasColumnType("date");

                entity.Property(e => e.StartDate).HasColumnType("date");

                entity.Property(e => e.Subject).HasMaxLength(200);

                entity.HasOne(d => d.CreatedByNavigation)
                    .WithMany(p => p.SysAdminAnnouncementCreatedByNavigation)
                    .HasForeignKey(d => d.CreatedBy)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_SysAdminAnnouncements_AgendaUser1");

                entity.HasOne(d => d.LastModifiedByNavigation)
                    .WithMany(p => p.SysAdminAnnouncementLastModifiedByNavigation)
                    .HasForeignKey(d => d.LastModifiedBy)
                    .HasConstraintName("FK_SysAdminAnnouncements_AgendaUser");
            });

            //modelBuilder.Entity<User>(entity =>
            //{
            //    entity.Property(e => e.AutoSaveEnabled).HasDefaultValueSql("1");

            //    entity.Property(e => e.CreatedDate)
            //        .HasColumnType("datetime")
            //        .HasDefaultValueSql("getdate()");

            //    entity.Property(e => e.DefaultGroupId).HasDefaultValueSql("0");

            //    entity.Property(e => e.EmailAddress)
            //        .IsRequired()
            //        .HasColumnType("varchar(150)");

            //    entity.Property(e => e.FirstName)
            //        .IsRequired()
            //        .HasColumnType("varchar(50)");

            //    entity.Property(e => e.FullName)
            //        .IsRequired()
            //        .HasColumnType("varchar(101)")
            //        .HasComputedColumnSql("([FirstName]+' ')+[LastName]")
            //        .ValueGeneratedOnAddOrUpdate();

            //    entity.Property(e => e.GeneralInfo).HasColumnType("text");

            //    entity.Property(e => e.LastLockoutDate).HasColumnType("datetime");

            //    entity.Property(e => e.LastLoginDate).HasColumnType("datetime");

            //    entity.Property(e => e.LastModifiedDate)
            //        .HasColumnType("datetime")
            //        .HasDefaultValueSql("getdate()");

            //    entity.Property(e => e.LastName)
            //        .IsRequired()
            //        .HasColumnType("varchar(50)");

            //    entity.Property(e => e.LastPasswordChangedDate).HasColumnType("datetime");

            //    entity.Property(e => e.MiddleName).HasColumnType("varchar(50)");

            //    entity.Property(e => e.Password).HasMaxLength(128);

            //    entity.Property(e => e.PasswordHash).HasMaxLength(128);

            //    entity.Property(e => e.PasswordResetCode).HasMaxLength(128);

            //    entity.Property(e => e.ServerSalt).HasMaxLength(128);

            //    entity.Property(e => e.UserTitle).HasColumnType("varchar(150)");

            //    entity.Property(e => e.WarnOnDirty).HasDefaultValueSql("1");

            //    entity.HasOne(d => d.AgendaDateRange)
            //        .WithMany(p => p.User)
            //        .HasForeignKey(d => d.AgendaDateRangeId)
            //        .OnDelete(DeleteBehavior.Restrict)
            //        .HasConstraintName("FK_AgendaUser_AgendaDateRange_Lkp");

            //    entity.HasOne(d => d.CreatedByNavigation)
            //        .WithMany(p => p.InverseCreatedByNavigation)
            //        .HasForeignKey(d => d.CreatedBy)
            //        .OnDelete(DeleteBehavior.Restrict)
            //        .HasConstraintName("FK_Users_User");

            //    entity.HasOne(d => d.LastModifiedByNavigation)
            //        .WithMany(p => p.InverseLastModifiedByNavigation)
            //        .HasForeignKey(d => d.LastModifiedBy)
            //        .HasConstraintName("FK_Users_User1");
            //});
        }
    }
}
