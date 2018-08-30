using System;
using System.Collections.Generic;

namespace AMSuite2.Files.DataClasses
{
    public partial class AnnouncementAttachments
    {
        public int Id { get; set; }
        public int AnnouncementId { get; set; }
        public string AttachmentName { get; set; }
        public int TypeId { get; set; }
        public int? GroupId { get; set; }
        public int? AccountId { get; set; }
        public long FileSize { get; set; }
        public byte[] FileContent { get; set; }
        public Guid Key { get; set; }
        public string MimeType { get; set; }
        public string FileExtension { get; set; }
    }
}
