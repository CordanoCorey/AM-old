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
    public interface IBinNotesRepository : IBaseRepository<BinAgendaRecord, BinNotesModel>
    {
        IEnumerable<BinNotesModel> FindByBinItem(int binItemId);
        BinNotesModel FindByBinItem(int binItemId, int userId);
    }

    public class BinNotesRepository : BaseRepository<BinAgendaRecord, BinNotesModel>, IBinNotesRepository
    {
        public BinNotesRepository(AMSuiteContext context, IMapper mapper) : base(context, mapper)
        {
        }

        public override IQueryable<BinAgendaRecord> DbSet => Include(BaseDbSet.Where(x => x.AgendaRecordTypeId == 2));

        public IEnumerable<BinNotesModel> FindByBinItem(int binItemId)
        {
            return FindBy(x => x.BinAgendaItemId == binItemId);
        }

        public BinNotesModel FindByBinItem(int binItemId, int userId)
        {
            var results = DbSet.Where(x => x.BinAgendaItemId == binItemId)
                .Join(_context.BinAgendaItemData.Where(x => x.UserId == userId),
                    x => x.BinAgendaItemId,
                    y => y.Id,
                    (x, y) => x
                ).SingleOrDefault();
            return Map(results);
        }
    }
}
