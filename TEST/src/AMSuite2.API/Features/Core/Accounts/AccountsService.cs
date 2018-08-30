using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AMSuite2.API.Features.Core.AccountLogo;

namespace AMSuite2.API.Features.Core.Accounts
{
    public interface IAccountsService
    {
        IEnumerable<AccountModel> GetAccounts();
        AccountModel GetAccount(int id);
        AccountModel AddAccount(AccountModel account);
        AccountModel UpdateAccount(AccountModel account);
        IEnumerable<string> GetAccountNames();
        IEnumerable<AccountModel> GetAccountStatuses();
    }

    public class AccountsService : IAccountsService
    {
        private readonly IAccountsRepository _repo;

        public AccountsService(IAccountsRepository repo)
        {
            _repo = repo;
        }

        public AccountModel AddAccount(AccountModel account)
        {
            return _repo.Insert(account);
        }

        public AccountModel GetAccount(int id)
        {
            return _repo.FindByKey(id);
        }

        public IEnumerable<string> GetAccountNames()
        {
            return _repo.All().Select(x => x.Name);
        }

        public IEnumerable<AccountModel> GetAccounts()
        {
            return _repo.All().OrderBy(x => x.Name);
        }

        public IEnumerable<AccountModel> GetAccountStatuses()
        {
            return _repo.AllIncludingStatus();
        }

        public AccountModel UpdateAccount(AccountModel account)
        {
            var existingAccount = GetAccount(account.Id);
            account.EmailAgendaTemplate = existingAccount.EmailAgendaTemplate;
            account.EmailTemplate = existingAccount.EmailTemplate;
            account.TrialPeriodStartDate = existingAccount.TrialPeriodStartDate;
            account.TrialPeriodEndDate = existingAccount.TrialPeriodEndDate;
            return _repo.Update(account);
        }
    }
}
