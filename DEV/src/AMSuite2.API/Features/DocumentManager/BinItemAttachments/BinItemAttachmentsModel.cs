using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AMSuite2.API.Features.DocumentManager.Attachments;
using AMSuite2.API.Infrastructure.Models;

namespace AMSuite2.API.Features.DocumentManager.BinItemAttachments
{
    public class BinItemAttachmentModel : BaseEntity, IEntity
    {
        public int Id { get; set; }
        public int BinItemId { get; set; }
        public string FileExtension { get; set; }
        public string FileId { get; set; }
        public bool IsPrivate { get; set; }
        public string Name { get; set; }
        public int Order { get; set; }
    }
}
