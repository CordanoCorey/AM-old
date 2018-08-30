using System;
using System.Collections.Generic;

namespace AMSuite2.Files.DataClasses
{
    public partial class Attachments
    {
        public long AttachmentId { get; set; }
        public string AttachmentName { get; set; }
        public long AccountId { get; set; }
        public long AgendaId { get; set; }
        public long AgendaItemId { get; set; }
        public long FileSize { get; set; }
        public byte[] FileContent { get; set; }
        public Guid Key { get; set; }
        public string MimeType { get; set; }
        public string FileExtension { get; set; }
        public string AttachmentText { get; set; }
    }
}
