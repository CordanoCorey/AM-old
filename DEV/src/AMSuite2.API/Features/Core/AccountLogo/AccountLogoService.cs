using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AMSuite2.API.Features.Core.AccountLogo
{
    public interface IAccountLogoService
    {
        AccountLogoModel GetAccountLogo(int accountId);
        AccountLogoModel AddAccountLogo(AccountLogoModel model);
        AccountLogoModel UpdateAccountLogo(AccountLogoModel model);
    }

    public class AccountLogoService : IAccountLogoService
    {
        private readonly IAccountLogoRepository _repo;

        public AccountLogoService(IAccountLogoRepository repo)
        {
            _repo = repo;
        }

        public AccountLogoModel GetAccountLogo(int accountId)
        {
            return _repo.FindByKey(accountId, "Account");
        }

        public AccountLogoModel AddAccountLogo(AccountLogoModel model)
        {
            var logo = GetAccountLogo(model.AccountId);
            if (logo != null)
            {
                _repo.Delete(logo.Id);
            }
            return _repo.Insert(model);
        }

        public AccountLogoModel UpdateAccountLogo(AccountLogoModel model)
        {
            var logo = GetAccountLogo(model.AccountId);
            model.Id = logo.Id;
            return _repo.Update(logo);
        }
    }
}
