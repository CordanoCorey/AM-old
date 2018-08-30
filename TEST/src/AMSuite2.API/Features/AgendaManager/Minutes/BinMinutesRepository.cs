using AMSuite2.API.Infrastructure.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AMSuite2.Entities.Context;
using AMSuite2.Entities.DataClasses;
using AutoMapper;

namespace AMSuite2.API.Features.AgendaManager.Minutes
{
    public interface IBinMinutesRepository : IBaseRepository<BinAgendaRecord, BinMinutesModel>
    {
        IEnumerable<BinMinutesModel> FindByBinItem(int binItemId);
        BinMinutesModel FindByBinItem(int binItemId, int userId);
    }

    public class BinMinutesRepository : BaseRepository<BinAgendaRecord, BinMinutesModel>, IBinMinutesRepository
    {
        public BinMinutesRepository(AMSuiteContext context, IMapper mapper) : base(context, mapper)
        {
        }

        public override IQueryable<BinAgendaRecord> DbSet => Include(BaseDbSet.Where(x => x.AgendaRecordTypeId == 1));

        public IEnumerable<BinMinutesModel> FindByBinItem(int binItemId)
        {
            return FindBy(x => x.BinAgendaItemId == binItemId);
        }

        public BinMinutesModel FindByBinItem(int binItemId, int userId)
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
