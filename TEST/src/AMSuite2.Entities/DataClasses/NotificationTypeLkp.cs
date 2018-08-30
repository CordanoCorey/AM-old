using System;
using System.Collections.Generic;

namespace AMSuite2.Entities.DataClasses
{
    public partial class NotificationTypeLkp
    {
        public NotificationTypeLkp()
        {
            Notification = new HashSet<Notification>();
        }

        public int Id { get; set; }
        public string Type { get; set; }

        public virtual ICollection<Notification> Notification { get; set; }
    }
}
