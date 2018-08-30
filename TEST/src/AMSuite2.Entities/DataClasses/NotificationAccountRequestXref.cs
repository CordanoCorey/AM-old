using System;
using System.Collections.Generic;
using AMSuite2.Entities.Identity;

namespace AMSuite2.Entities.DataClasses
{
    public partial class NotificationAccountRequestXref
    {
        public int Id { get; set; }
        public int NotificationId { get; set; }
        public int UserId { get; set; }

        public virtual Notification Notification { get; set; }
        public virtual ApplicationUser User { get; set; }
    }
}
