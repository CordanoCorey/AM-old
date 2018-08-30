using AMSuite2.API.Infrastructure.Repositories;
using AMSuite2.Entities.DataClasses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AMSuite2.Entities.Context;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace AMSuite2.API.Features.AgendaManager.AgendaItems
{
    public interface IAgendaItemsRepository : IBaseRepository<AgendaItemData, AgendaItemModel>
    {
        IEnumerable<AgendaItemModel> FindByAgenda(int agendaId);
        IEnumerable<AgendaItemModel> FindByMeeting(int meetingId);
    }
    public class AgendaItemsRepository : BaseRepository<AgendaItemData, AgendaItemModel>, IAgendaItemsRepository
    {
        public AgendaItemsRepository(AMSuiteContext context, IMapper mapper) : base(context, mapper)
        {
        }

        public IEnumerable<AgendaItemModel> FindByAgenda(int agendaId) => FindBy(x => x.AgendaId == agendaId);

        public IEnumerable<AgendaItemModel> FindByMeeting(int meetingId)
        {
            var results = Include(_dbSet)
                .Join(_context.Agenda.Where(a => a.MeetingId == meetingId),
                    ai => ai.AgendaId,
                    a => a.Id,
                    (ai, a) => ai
                ).ToList();
            return Map(results);
        }

        protected override IQueryable<AgendaItemData> Include(IQueryable<AgendaItemData> queryable)
        {
            return queryable.Include(x => x.Agenda);
        }
    }
}
