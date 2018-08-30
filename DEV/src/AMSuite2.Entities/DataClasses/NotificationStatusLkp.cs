using System;
using System.Collections.Generic;

namespace AMSuite2.Entities.DataClasses
{
    public partial class NotificationStatusLkp
    {
        public NotificationStatusLkp()
        {
            Notification = new HashSet<Notification>();
        }

        public int Id { get; set; }
        public string Status { get; set; }

        public virtual ICollection<Notification> Notification { get; set; }
    }
}
