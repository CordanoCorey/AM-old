using AMSuite2.API.Infrastructure.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AMSuite2.API.Features.Core.GroupMembers;

namespace AMSuite2.API.Features.Core.AccountMembers
{
    public interface IAccountMembersService
    {
        SearchResults<AccountMemberModel> GetAccountMembers(int accountId);
        SearchResults<AccountMemberModel> GetAccountMembers(int accountId, QueryModel<AccountMemberModel> query);
        AccountMemberModel GetAccountMember(int accountId, int userId);
        AccountMemberModel AddAccountMember(AccountMemberModel member);
        AccountMemberModel UpdateAccountMember(AccountMemberModel member);
        IEnumerable<AccountMemberModel> GetUserAccounts(int userId);
        IEnumerable<int> GetUserAccountIds(int userId);
        IEnumerable<AccountMemberModel> GetGroupAdministrators(int accountId);
    }

    public class AccountMembersService : IAccountMembersService
    {
        private readonly IAccountMembersRepository _repo;
        private readonly IGroupMembersService _groupMembers;

        public AccountMembersService(IAccountMembersRepository repository, IGroupMembersService groupMembers)
        {
            _repo = repository;
            _groupMembers = groupMembers;
        }

        public AccountMemberModel AddAccountMember(AccountMemberModel member)
        {
            return _repo.Insert(member);
        }

        public AccountMemberModel UpdateAccountMember(AccountMemberModel member)
        {
            return _repo.Update(member);
        }

        public AccountMemberModel GetAccountMember(int accountId, int userId)
        {
            var member = _repo.FindByAccountAndUser(accountId, userId);
            member.Groups = _groupMembers.GetUserGroups(userId);
            member.Accounts = GetUserAccounts(userId);
            return member;
        }

        public SearchResults<AccountMemberModel> GetAccountMembers(int accountId)
        {
            var results = _repo.FindByAccount(accountId);
            var total = results.Count();
            return new SearchResults<AccountMemberModel>()
            {
                //Query = new QueryModel<AccountMemberModel>(),
                Results = results,
                Total = total
            };
        }

        public SearchResults<AccountMemberModel> GetAccountMembers(int accountId, QueryModel<AccountMemberModel> query)
        {
            var members = _repo.FindByAccount(accountId);
            var results = _repo.Query(members, query);
            var total = _repo.Count();
            return new SearchResults<AccountMemberModel>()
            {
                //Query = query,
                Results = results,
                Total = total
            };
        }

        public IEnumerable<AccountMemberModel> GetUserAccounts(int userId)
        {
            return _repo.FindByUser(userId);
        }

        public IEnumerable<int> GetUserAccountIds(int userId)
        {
            return GetUserAccounts(userId).Select(x => x.AccountId);
        }

        public IEnumerable<AccountMemberModel> GetGroupAdministrators(int accountId)
        {
            return _repo.FindByAccount(accountId).Where(x => x.IsGroupAdministrator);
        }
    }
}
