using System;
using System.Collections.Generic;

namespace AMSuite2.Entities.DataClasses
{
    public partial class Account
    {
        public Account()
        {
            AccountLogo = new HashSet<AccountLogo>();
            AccountUserRoleXref = new HashSet<AccountUserRoleXref>();
            Announcement = new HashSet<Announcement>();
            BinAgendaItemData = new HashSet<BinAgendaItemData>();
            Group = new HashSet<Group>();
            Meeting = new HashSet<Meeting>();
            Notification = new HashSet<Notification>();
        }

        public int Id { get; set; }
        public string AccountName { get; set; }
        public string AccountDescription { get; set; }
        public string Urlbase { get; set; }
        public int AccountStatusId { get; set; }
        public int AccountOwnerId { get; set; }
        public string MailAgendaTemplate { get; set; }
        public string MailItemTemplate { get; set; }
        public DateTime? TrialPeriodStartDate { get; set; }
        public DateTime? TrialPeriodEndDate { get; set; }
        public bool? AllowRequests { get; set; }
        public Guid? PublicContentSourceId { get; set; }
        public Guid? MemberContentSourceId { get; set; }
        public string DefaultSignature { get; set; }

        public virtual ICollection<AccountLogo> AccountLogo { get; set; }
        public virtual ICollection<AccountUserRoleXref> AccountUserRoleXref { get; set; }
        public virtual ICollection<Announcement> Announcement { get; set; }
        public virtual ICollection<BinAgendaItemData> BinAgendaItemData { get; set; }
        public virtual ICollection<Group> Group { get; set; }
        public virtual ICollection<Meeting> Meeting { get; set; }
        public virtual ICollection<Notification> Notification { get; set; }
        public virtual AccountStatusLkp AccountStatus { get; set; }
    }
}
