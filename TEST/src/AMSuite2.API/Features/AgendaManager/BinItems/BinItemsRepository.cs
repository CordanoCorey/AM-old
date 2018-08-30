using AMSuite2.API.Infrastructure.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AMSuite2.Entities.Context;
using AMSuite2.Entities.DataClasses;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace AMSuite2.API.Features.AgendaManager.BinItems
{
    public interface IBinItemsRepository : IBaseRepository<BinAgendaItemData, BinItemModel>
    {
        IEnumerable<BinItemModel> FindByUser(int userId);
        IEnumerable<BinItemModel> FindByUserAndAccount(int userId, int accountId);
    }
    public class BinItemsRepository : BaseRepository<BinAgendaItemData, BinItemModel>, IBinItemsRepository
    {
        public BinItemsRepository(AMSuiteContext context, IMapper mapper) : base(context, mapper)
        {
        }

        public IEnumerable<BinItemModel> FindByUser(int userId)
        {
            return FindBy(x => x.UserId == userId);
        }

        public IEnumerable<BinItemModel> FindByUserAndAccount(int userId, int accountId)
        {
            return FindBy(x => x.UserId == userId && x.AccountId == accountId);
        }
    }
}
