using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AMSuite2.API.Features.AgendaManager.BinItems
{
    public interface IBinItemsService
    {
        IEnumerable<BinItemModel> GetBinItems(int userId);
        BinItemModel GetBinItem(int id);
        BinItemModel AddBinItem(BinItemModel item);
        BinItemModel UpdateBinItem(BinItemModel item);
        void DeleteBinItem(int id);
    }
    public class BinItemsService : IBinItemsService
    {
        private readonly IBinItemsRepository _repo;

        public BinItemsService(IBinItemsRepository repo)
        {
            _repo = repo;
        }

        public BinItemModel AddBinItem(BinItemModel item)
        {
            return _repo.Insert(item);
        }

        public void DeleteBinItem(int id)
        {
            _repo.Delete(id);
        }

        public BinItemModel GetBinItem(int id)
        {
            return _repo.FindByKey(id);
        }

        public IEnumerable<BinItemModel> GetBinItems(int userId)
        {
            return _repo.FindByUser(userId);
        }

        public BinItemModel UpdateBinItem(BinItemModel item)
        {
            return _repo.Update(item);
        }
    }
}
