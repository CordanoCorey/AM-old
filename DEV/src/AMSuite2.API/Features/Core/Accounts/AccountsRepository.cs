using AMSuite2.Entities.DataClasses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AMSuite2.API.Features.Core.AccountLogo;
using AMSuite2.API.Infrastructure.Repositories;
using AMSuite2.Entities.Context;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace AMSuite2.API.Features.Core.Accounts
{
    public interface IAccountsRepository : IBaseRepository<Account, AccountModel>
    {
        IEnumerable<AccountModel> AllIncludingStatus();
    }
    public class AccountsRepository : BaseRepository<Account, AccountModel>, IAccountsRepository
    {
        public AccountsRepository(AMSuiteContext context, IMapper mapper) : base(context, mapper)
        {
        }

        public override IEnumerable<AccountModel> All()
        {
            return AllInclude(x => x.AccountLogo, x => x.AccountStatus);
        }

        public IEnumerable<AccountModel> AllIncludingStatus()
        {
            return AllInclude(x => x.AccountStatus);
        }

        protected override IQueryable<Account> Include(IQueryable<Account> queryable)
        {
            return queryable.Include(x => x.AccountLogo);
        }

        public override AccountModel Map(Account entity)
        {
            var logo = entity.AccountLogo
                .OrderByDescending(x => x.CreatedOn)
                .FirstOrDefault();
            var model = base.Map(entity);
            model.Logo = _mapper.Map<AccountLogoModel>(logo);
            return model;
        }
    }
}
