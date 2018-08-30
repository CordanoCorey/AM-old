using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AMSuite2.API.Features.DocumentManager.EmailAttachments;
using AMSuite2.API.Infrastructure.Models;

namespace AMSuite2.API.Features.Core.Email
{
    public class EmailModel : BaseEntity, IEntity
    {
        public int Id { get; set; }
        public string Bcc { get; set; }
        public string Body { get; set; }
        public string Cc { get; set; }
        public string Failed { get; set; }
        public string From { get; set; }
        public bool Sent { get; set; }
        public DateTime? SentDate { get; set; }
        public string Subject { get; set; }
        public string To { get; set; }

        IEnumerable<EmailAttachmentModel> Attachment { get; set; }
}
}
