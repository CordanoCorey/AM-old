using System;
using System.Collections.Generic;

namespace AMSuite2.Entities.DataClasses
{
    public partial class NotificationSuggestedItemXref
    {
        public int Id { get; set; }
        public int NotificationId { get; set; }
        public int AgendaItemId { get; set; }

        public virtual AgendaItemData AgendaItem { get; set; }
        public virtual Notification Notification { get; set; }
    }
}
