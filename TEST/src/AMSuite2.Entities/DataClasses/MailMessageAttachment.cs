using System;
using System.Collections.Generic;

namespace AMSuite2.Entities.DataClasses
{
    public partial class MailMessageAttachment
    {
        public long Id { get; set; }
        public long MailMessageId { get; set; }
        public string FileName { get; set; }
        public long? FileSize { get; set; }
        public string FileExtension { get; set; }
        public string MimeType { get; set; }
        public Guid Key { get; set; }
        public int? AccountId { get; set; }
        public int? AgendaId { get; set; }
        public int? AgendaItemId { get; set; }

        public virtual MailMessage MailMessage { get; set; }
    }
}
