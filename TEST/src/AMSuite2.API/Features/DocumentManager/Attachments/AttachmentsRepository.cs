using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AMSuite2.API.Infrastructure.Repositories;
using AMSuite2.Entities.Context;
using AMSuite2.Entities.DataClasses;
using AutoMapper;

namespace AMSuite2.API.Features.DocumentManager.Attachments
{
    public interface IAttachmentsRepository : IBaseRepository<Attachment, AttachmentModel>
    {
        IEnumerable<AttachmentModel> FindByAgendaId(int agendaId);
        IEnumerable<AttachmentModel> FindByAgendaItemId(int agendaItemId);
    }

    public class AttachmentsRepository : BaseRepository<Attachment, AttachmentModel>, IAttachmentsRepository
    {
        public AttachmentsRepository(AMSuiteContext context, IMapper mapper) : base(context, mapper)
        {
        }

        public IEnumerable<AttachmentModel> FindByAgendaId(int agendaId)
        {
            var results = _dbSet
                .Join(_context.AgendaItemData.Where(ai => ai.AgendaId == agendaId),
                    a => a.AgendaItemId,
                    ai => ai.Id,
                    (a, ai) => a
                ).ToList();
            return Map(results);
        }

        public IEnumerable<AttachmentModel> FindByAgendaItemId(int agendaItemId)
        {
            return FindBy(x => x.AgendaItemId == agendaItemId);
        }
    }
}
