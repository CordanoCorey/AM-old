using System;
using System.Collections.Generic;

namespace AMSuite2.Files.DataClasses
{
    public partial class BinAttachments
    {
        public long Id { get; set; }
        public int BinAgendaItemId { get; set; }
        public string AttachmentName { get; set; }
        public long UserId { get; set; }
        public long FileSize { get; set; }
        public byte[] FileContent { get; set; }
        public Guid Key { get; set; }
        public string MimeType { get; set; }
        public string FileExtension { get; set; }
    }
}
