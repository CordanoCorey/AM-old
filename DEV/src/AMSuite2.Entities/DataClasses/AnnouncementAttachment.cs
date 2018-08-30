using System;
using System.Collections.Generic;

namespace AMSuite2.Entities.DataClasses
{
    public partial class AnnouncementAttachment
    {
        public int Id { get; set; }
        public int AnnouncementId { get; set; }
        public Guid? FileId { get; set; }
        public string AttachmentName { get; set; }
        public string FileExtension { get; set; }
        public int DisplayOrder { get; set; }

        public virtual Announcement Announcement { get; set; }
    }
}
