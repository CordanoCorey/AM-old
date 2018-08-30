using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AMSuite2.API.Infrastructure.Repositories;
using AMSuite2.Entities.Context;
using AMSuite2.Entities.DataClasses;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace AMSuite2.API.Features.Core.AccountRequests
{
    public interface IAccountRequestsRepository : IBaseRepository<NotificationAccountRequestXref, AccountRequestModel>
    {
        IEnumerable<AccountRequestModel> FindByAccount(int accountId);
        AccountRequestModel FindByAccountAndUser(int accountId, int userId);
        int DeleteReference(int id);
    }

    public class AccountRequestsRepository : BaseRepository<NotificationAccountRequestXref, AccountRequestModel>, IAccountRequestsRepository
    {
        public AccountRequestsRepository(AMSuiteContext context, IMapper mapper) : base(context, mapper)
        {
        }

        public IEnumerable<AccountRequestModel> FindByAccount(int accountId)
        {
            var results = Include(_dbSet.AsNoTracking())
                .Join(_context.Notification.Where(n => n.AccountId == accountId),
                    ar => ar.NotificationId,
                    n => n.Id,
                    (ar, n) => ar
                ).ToList();
            return Map(results);
        }

        public AccountRequestModel FindByAccountAndUser(int accountId, int userId)
        {
            var results = Include(_dbSet.AsNoTracking()).Where(x => x.UserId == userId)
                .Join(_context.Notification.Where(n => n.AccountId == accountId),
                    ar => ar.NotificationId,
                    n => n.Id,
                    (ar, n) => ar
                ).FirstOrDefault();
            return Map(results);
        }

        public virtual int DeleteReference(int id)
        {
            var lambda = Utils.BuildLambdaForFindByKey<NotificationAccountRequestXref>(id);
            var entity = _dbSet.AsNoTracking().SingleOrDefault(lambda);
            var fk = entity.NotificationId;
            _dbSet.Remove(entity);
            return fk;
        }

        protected override IQueryable<NotificationAccountRequestXref> Include(IQueryable<NotificationAccountRequestXref> queryable)
        {
            return queryable.Include(x => x.Notification)
                .Include(y => y.User);
        }
    }
}
