using System;
using System.Collections.Generic;
using AMSuite2.Entities.Identity;

namespace AMSuite2.Entities.DataClasses
{
    public partial class Notification
    {
        public Notification()
        {
            NotificationAccountRequestXref = new HashSet<NotificationAccountRequestXref>();
            NotificationSuggestedItemXref = new HashSet<NotificationSuggestedItemXref>();
        }

        public int Id { get; set; }
        public int TypeId { get; set; }
        public int StatusId { get; set; }
        public string LinkText { get; set; }
        public string LinkUrl { get; set; }
        public string Message { get; set; }
        public DateTime CreatedDate { get; set; }
        public int CreatedBy { get; set; }
        public int? ResolvedBy { get; set; }
        public int? GroupId { get; set; }
        public int? UserId { get; set; }
        public int AccountId { get; set; }
        public int? LinkedNotificationId { get; set; }

        public virtual ICollection<NotificationAccountRequestXref> NotificationAccountRequestXref { get; set; }
        public virtual ICollection<NotificationSuggestedItemXref> NotificationSuggestedItemXref { get; set; }
        public virtual Account Account { get; set; }
        public virtual ApplicationUser CreatedByNavigation { get; set; }
        public virtual Group Group { get; set; }
        public virtual Notification LinkedNotification { get; set; }
        public virtual ICollection<Notification> InverseLinkedNotification { get; set; }
        public virtual ApplicationUser ResolvedByNavigation { get; set; }
        public virtual NotificationStatusLkp Status { get; set; }
        public virtual NotificationTypeLkp Type { get; set; }
        public virtual ApplicationUser User { get; set; }
    }
}
