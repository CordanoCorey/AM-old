using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AMSuite2.API.Features.DocumentManager.Attachments;
using AMSuite2.API.Infrastructure.Models;

namespace AMSuite2.API.Features.DocumentManager.EmailAttachments
{
    public class EmailAttachmentModel : BaseEntity, IEntity
    {
        public int Id { get; set; }
        public int? AccountId { get; set; }
        public int? AgendaId { get; set; }
        public int? AgendaItemId { get; set; }
        public int EmailId { get; set; }
        public string FileExtension { get; set; }
        public Guid FileId { get; set; }
        public string FileName { get; set; }
        public int? FileSize { get; set; }
        public bool IsPrivate { get; set; }
        public string MimeType { get; set; }
        public string Name { get; set; }
        public int Order { get; set; }
    }
}
