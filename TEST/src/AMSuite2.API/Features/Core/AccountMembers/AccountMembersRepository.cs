using AMSuite2.API.Infrastructure.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AMSuite2.Entities.Context;
using AMSuite2.Entities.DataClasses;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace AMSuite2.API.Features.Core.AccountMembers
{
    public interface IAccountMembersRepository : IBaseRepository<AccountUserRoleXref, AccountMemberModel>
    {
        IEnumerable<AccountMemberModel> FindByAccount(int accountId);
        IEnumerable<AccountMemberModel> FindByUser(int userId);
        AccountMemberModel FindByAccountAndUser(int accountId, int userId);
    }

    public class AccountMembersRepository : BaseRepository<AccountUserRoleXref, AccountMemberModel>, IAccountMembersRepository
    {
        public AccountMembersRepository(AMSuiteContext context, IMapper mapper) : base(context, mapper)
        {
        }

        public IEnumerable<AccountMemberModel> FindByAccount(int accountId)
        {
            IEnumerable<AccountUserRoleXref> results = BaseDbSet
                .Where(x => x.AccountId == accountId)
                .Include(y => y.Role)
                .Include(z => z.User)
                .OrderBy(x => x.User.LastName)
                .ToList();
            return results.Select(Map);
        }

        public IEnumerable<AccountMemberModel> FindByUser(int userId)
        {
            return FindBy(x => x.UserId == userId);
        }

        public AccountMemberModel FindByAccountAndUser(int accountId, int userId)
        {
            return FindSingle(x => x.AccountId == accountId && x.UserId == userId);
        }

        protected override IQueryable<AccountUserRoleXref> Include(IQueryable<AccountUserRoleXref> queryable)
        {
            return queryable.Include(x => x.Role);
        }

        protected override IQueryable<AccountUserRoleXref> IncludeSingle(IQueryable<AccountUserRoleXref> queryable)
        {
            return queryable.Include(x => x.Role).Include(x => x.User);
        }
    }
}
