using AMSuite2.API.Infrastructure.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AMSuite2.Entities.Context;
using AMSuite2.Entities.DataClasses;
using AutoMapper;

namespace AMSuite2.API.Features.AgendaManager.Notes
{
    public interface INotesRepository : IBaseRepository<AgendaRecord, NotesModel>
    {
        IEnumerable<NotesModel> FindByAgenda(int agendaId);
        IEnumerable<NotesModel> FindByAgenda(int agendaId, int userId);
        IEnumerable<NotesModel> FindByAgendaItem(int agendaItemId);
        NotesModel FindByAgendaItem(int agendaItemId, int userId);
    }

    public class NotesRepository : BaseRepository<AgendaRecord, NotesModel>, INotesRepository
    {
        public NotesRepository(AMSuiteContext context, IMapper mapper) : base(context, mapper)
        {
        }

        public override IQueryable<AgendaRecord> DbSet => Include(BaseDbSet.Where(x => x.AgendaRecordTypeId == 2));

        public IEnumerable<NotesModel> FindByAgenda(int agendaId)
        {
            var results = DbSet
                .Join(_context.AgendaItemData.Where(y => y.AgendaId == agendaId),
                    x => x.AgendaItemId,
                    y => y.Id,
                    (x, y) => x
                ).ToList();
            return Map(results);
        }

        public IEnumerable<NotesModel> FindByAgenda(int agendaId, int userId)
        {
            var results = DbSet.Where(x => x.Createdby == userId)
                .Join(_context.AgendaItemData.Where(y => y.AgendaId == agendaId),
                    x => x.AgendaItemId,
                    y => y.Id,
                    (x, y) => x
                ).ToList();
            return Map(results);
        }

        public IEnumerable<NotesModel> FindByAgendaItem(int agendaItemId)
        {
            return FindBy(x => x.AgendaItemId == agendaItemId);
        }

        public NotesModel FindByAgendaItem(int agendaItemId, int userId)
        {
            return FindBy(x => x.AgendaItemId == agendaItemId && x.Createdby == userId).SingleOrDefault();
        }
    }
}
