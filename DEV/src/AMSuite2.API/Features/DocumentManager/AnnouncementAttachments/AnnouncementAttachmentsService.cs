using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AMSuite2.API.Features.DocumentManager.AnnouncementAttachments
{
    public interface IAnnouncementAttachmentsService
    {
        IEnumerable<AnnouncementAttachmentModel> GetAnnouncementAttachments(int announcementId);
    }

    public class AnnouncementAttachmentsService : IAnnouncementAttachmentsService
    {
        private readonly IAnnouncementAttachmentsRepository _repo;

        public AnnouncementAttachmentsService(IAnnouncementAttachmentsRepository repo)
        {
            _repo = repo;
        }
        public IEnumerable<AnnouncementAttachmentModel> GetAnnouncementAttachments(int announcementId)
        {
            return _repo.FindByAnnouncement(announcementId);
        }
    }
}
