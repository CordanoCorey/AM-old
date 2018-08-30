using AMSuite2.API.Infrastructure.Repositories;
using AMSuite2.Entities.DataClasses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AMSuite2.Entities.Context;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace AMSuite2.API.Features.AgendaManager.Agendas
{
    public interface IAgendasRepository : IBaseRepository<Agenda, AgendaModel>
    {
        IEnumerable<AgendaModel> FindByMeeting(int meetingId);
        IEnumerable<AgendaModel> FindDeletedAgendas(int accountId);
    }
    public class AgendasRepository : BaseRepository<Agenda, AgendaModel>, IAgendasRepository
    {
        public AgendasRepository(AMSuiteContext context, IMapper mapper) : base(context, mapper)
        {
        }

        public IEnumerable<AgendaModel> FindByMeeting(int meetingId)
        {
            return FindBy(x => x.MeetingId == meetingId);
        }

        public IEnumerable<AgendaModel> FindDeletedAgendas(int accountId)
        {
            return accountId == 6 ? FindBy(x => x.MarkedForDelete != null) : FindBy(x => x.MarkedForDelete != null && x.Meeting.AccountId == accountId);
        }

        protected override IQueryable<Agenda> Include(IQueryable<Agenda> queryable)
        {
            return queryable.Include(x => x.Group)
                .Include(x => x.Meeting)
                .Include(x => x.Status)
                .Include(x => x.TimeFrame);
        }

        protected override IQueryable<Agenda> IncludeSingle(IQueryable<Agenda> queryable)
        {
            return Include(queryable);
        }
    }
}
