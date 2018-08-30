using System;
using System.Collections.Generic;

namespace AMSuite2.Entities.DataClasses
{
    public partial class MailMessage
    {
        public MailMessage()
        {
            MailMessageAttachment = new HashSet<MailMessageAttachment>();
        }

        public long Id { get; set; }
        public string Bcc { get; set; }
        public string Body { get; set; }
        public string Cc { get; set; }
        public DateTime CreationDateTime { get; set; }
        public string Failed { get; set; }
        public string From { get; set; }
        public bool Sent { get; set; }
        public DateTime? SentDate { get; set; }
        public string Subject { get; set; }
        public string To { get; set; }
        public int? CreatedBy { get; set; }

        public virtual ICollection<MailMessageAttachment> MailMessageAttachment { get; set; }
    }
}
