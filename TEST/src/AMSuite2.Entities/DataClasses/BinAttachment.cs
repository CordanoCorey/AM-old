using System;
using System.Collections.Generic;

namespace AMSuite2.Entities.DataClasses
{
    public partial class BinAttachment
    {
        public int Id { get; set; }
        public int BinAgendaItemId { get; set; }
        public Guid? FileId { get; set; }
        public string AttachmentName { get; set; }
        public string FileExtension { get; set; }
        public int DisplayOrder { get; set; }
        public bool IsPrivate { get; set; }

        public virtual BinAgendaItemData BinAgendaItem { get; set; }
    }
}
