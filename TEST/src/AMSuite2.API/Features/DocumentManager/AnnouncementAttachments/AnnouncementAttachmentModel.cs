using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AMSuite2.API.Infrastructure.Models;

namespace AMSuite2.API.Features.DocumentManager.AnnouncementAttachments
{
    public class AnnouncementAttachmentModel : IEntity
    {
        public int Id { get; set; }
        public int AnnouncementId { get; set; }
        public Guid FileId { get; set; }
        public string FileExtension { get; set; }
        public string Name { get; set; }
        public int Order { get; set; }
    }
}
