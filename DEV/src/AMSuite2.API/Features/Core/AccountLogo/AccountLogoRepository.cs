using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AMSuite2.API.Infrastructure.Repositories;
using AMSuite2.Entities.Context;
using AMSuite2.Entities.DataClasses;
using AutoMapper;

namespace AMSuite2.API.Features.Core.AccountLogo
{
    public interface IAccountLogoRepository : IBaseRepository<Entities.DataClasses.AccountLogo, AccountLogoModel>
    {
    }

    public class AccountLogoRepository : BaseRepository<Entities.DataClasses.AccountLogo, AccountLogoModel>, IAccountLogoRepository
    {
        public AccountLogoRepository(AMSuiteContext context, IMapper mapper) : base(context, mapper)
        {
        }
    }
}
