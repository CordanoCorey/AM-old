using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AMSuite2.API.Infrastructure.Models;

namespace AMSuite2.API.Features.Core.Email
{
    public class EmailItemModel : BaseEntity, IEntity
    {
        public int Id { get; set; }
        public string[] To { get; set; }
        public string From { get; set; }
        public string Cc { get; set; }
        public string Bcc { get; set; }
        public string Subject { get; set; }
        public string Body { get; set; }
        public string AgendaItemName { get; set; }
        public string PreviewHtml { get; set; }
        public bool AddAttachments { get; set; }
        public bool ConvertAttachments { get; set; }
    }
}
