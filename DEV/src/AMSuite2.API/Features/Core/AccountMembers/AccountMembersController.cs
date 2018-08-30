using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using AMSuite2.API.Infrastructure.Controllers;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using AMSuite2.API.Infrastructure.Models;

namespace AMSuite2.API.Features.Core.AccountMembers
{
    [Route("api/accounts")]
    public class AccountMembersController : BaseController
    {
        private readonly IAccountMembersService _service;
        public AccountMembersController(IAccountMembersService service)
        {
            _service = service;
        }

        /** 
         *  GET: api/accounts/5/members
         *  OLD: AccountMembers, GetAccountMembersByUrl
         */
        [HttpGet("{accountId}/members")]
        public IActionResult GetAccountMembers(int accountId, [FromQuery] QueryModel<AccountMemberModel> query)
        {
            return query.IsNullOrDefault? Get(_service.GetAccountMembers, accountId) : Get(_service.GetAccountMembers, accountId, query);
        }

        /**
         *  GET: api/accounts/5/members/5
         */
        [HttpGet("{accountId}/members/{userId}", Name = "GetAccountMember")]
        public IActionResult GetAccountMember(int accountId, int userId)
        {
            return Get(_service.GetAccountMember, accountId, userId);
        }

        /**
         *  POST: api/accounts/5/members
         *  OLD: HandleAccountRequest
         */
        [HttpPost("{accountId}/members")]
        public IActionResult AddAccountMember(int accountId, [FromBody]AccountMemberModel model)
        {
            model.AccountId = accountId;
            return Post(_service.AddAccountMember, model, "GetAccountMember", 
                (AccountMemberModel result) => new { accountId = result.AccountId, userId = result.UserId });
        }

        /**
         *  PUT: api/accounts/5/members/6
         */
        [HttpPut("{accountId}/members/{userId}")]
        public IActionResult UpdateAccountMember(int accountId, int userId, [FromBody]AccountMemberModel model)
        {
            model.AccountId = accountId;
            model.UserId = userId;
            return Put(_service.UpdateAccountMember, model);
        }

        /** 
         *  GET: api/users/5/accounts
         */
        [HttpGet("~/api/users/{userId}/accounts")]
        public IActionResult GetUserAccounts(int userId)
        {
            return Get(_service.GetUserAccounts, userId);
        }

        /**
         *  GET api/groups/5/administrators
         *  OLD: GetGroupAdministrators
         */
        [HttpGet("{accountId}/groupadministrators")]
        public IActionResult GetGroupAdministrators(int accountId)
        {
            return Get(_service.GetGroupAdministrators, accountId);
        }
    }
}
