using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AMSuite2.API.Infrastructure.Repositories;
using AMSuite2.Entities.Context;
using AMSuite2.Entities.DataClasses;
using AutoMapper;

namespace AMSuite2.API.Features.AgendaManager.Minutes
{
    public interface IMinutesRepository : IBaseRepository<AgendaRecord, MinutesModel>
    {
        IEnumerable<MinutesModel> FindByAgenda(int agendaId);
        IEnumerable<MinutesModel> FindByAgenda(int agendaId, int userId);
        IEnumerable<MinutesModel> FindByAgendaItem(int agendaItemId);
        MinutesModel FindByAgendaItem(int agendaItemId, int userId);
    }

    public class MinutesRepository : BaseRepository<AgendaRecord, MinutesModel>, IMinutesRepository
    {
        public MinutesRepository(AMSuiteContext context, IMapper mapper) : base(context, mapper)
        {
        }

        public override IQueryable<AgendaRecord> DbSet => Include(BaseDbSet.Where(x => x.AgendaRecordTypeId == 1));

        public IEnumerable<MinutesModel> FindByAgenda(int agendaId)
        {
            var results = DbSet
                .Join(_context.AgendaItemData.Where(y => y.AgendaId == agendaId),
                    x => x.AgendaItemId,
                    y => y.Id,
                    (x, y) => x
                ).ToList();
            return Map(results);
        }

        public IEnumerable<MinutesModel> FindByAgenda(int agendaId, int userId)
        {
            var results = DbSet.Where(x => x.Createdby == userId)
                .Join(_context.AgendaItemData.Where(y => y.AgendaId == agendaId),
                    x => x.AgendaItemId,
                    y => y.Id,
                    (x, y) => x
                ).ToList();
            return Map(results);
        }

        public IEnumerable<MinutesModel> FindByAgendaItem(int agendaItemId)
        {
            return FindBy(x => x.AgendaItemId == agendaItemId);
        }

        public MinutesModel FindByAgendaItem(int agendaItemId, int userId)
        {
            return FindBy(x => x.AgendaItemId == agendaItemId && x.Createdby == userId).SingleOrDefault();
        }
    }
}
