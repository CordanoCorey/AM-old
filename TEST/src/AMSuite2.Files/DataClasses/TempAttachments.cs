using System;
using System.Collections.Generic;

namespace AMSuite2.Files.DataClasses
{
    public partial class TempAttachments
    {
        public long TempAttachmentId { get; set; }
        public string AttachmentName { get; set; }
        public int DisplayOrder { get; set; }
        public Guid TempAgendaItemId { get; set; }
        public long FileSize { get; set; }
        public byte[] FileContent { get; set; }
        public Guid Key { get; set; }
        public string MimeType { get; set; }
        public string FileExtension { get; set; }
        public bool IsPrivate { get; set; }
    }
}
