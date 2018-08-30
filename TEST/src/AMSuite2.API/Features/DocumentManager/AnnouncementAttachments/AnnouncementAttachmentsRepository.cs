using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using AMSuite2.API.Infrastructure.Repositories;
using AMSuite2.Entities.Context;
using AMSuite2.Entities.DataClasses;
using AutoMapper;

namespace AMSuite2.API.Features.DocumentManager.AnnouncementAttachments
{
    public interface IAnnouncementAttachmentsRepository : IBaseRepository<AnnouncementAttachment, AnnouncementAttachmentModel>
    {
        IEnumerable<AnnouncementAttachmentModel> FindByAnnouncement(int announcementId);
    }

    public class AnnouncementAttachmentsRepository : BaseRepository<AnnouncementAttachment, AnnouncementAttachmentModel>, IAnnouncementAttachmentsRepository
    {
        public AnnouncementAttachmentsRepository(AMSuiteContext context, IMapper mapper) : base(context, mapper)
        {
        }

        public IEnumerable<AnnouncementAttachmentModel> FindByAnnouncement(int announcementId)
        {
            return FindBy(x => x.AnnouncementId == announcementId);
        }
    }
}
