using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AMSuite2.API.Features.DocumentManager.Attachments;
using AMSuite2.API.Infrastructure.Models;

namespace AMSuite2.API.Features.Core.Announcements
{
    public class AnnouncementModel : BaseEntity, IEntity
    {
        public int Id { get; set; }
        public int AccountId { get; set; }
        public int AnnouncementTypeId { get; set; }
        public string Description { get; set; }
        public int GroupId { get; set; }
        public string Signature { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string Subject { get; set; }

        public string AnnouncementTypeName { get; set; }
        public IEnumerable<AttachmentModel> Attachments { get; set; } = new List<AttachmentModel>();
        public string GroupName { get; set; }
    }
}
