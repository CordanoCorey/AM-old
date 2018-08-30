using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using AMSuite2.API.Infrastructure.Controllers;

namespace AMSuite2.API.Features.Core.Accounts
{
    [Route("api/accounts")]
    public class AccountsController : BaseController
    {
        private readonly IAccountsService _service;
        public AccountsController(IAccountsService service)
        {
            _service = service;
        }

        /**
         *  GET: api/accounts
         *  OLD: GetAccounts
         */
        [HttpGet]
        public IActionResult GetAccounts()
        {
            return Get(_service.GetAccounts);
        }

        /**
         *  GET: api/accounts/5
         *  OLD: GetAccountInfo, BasicInfo, GetDefaultSignature
         */
        [HttpGet("{id}", Name = "GetAccount")]
        public IActionResult GetAccount(int id)
        {
            return Get(_service.GetAccount, id);
        }

        /**
         *  POST: api/accounts
         *  OLD: UpdateAccount
         */
        [HttpPost]
        public IActionResult AddAccount([FromBody]AccountModel value)
        {
            return Post(_service.AddAccount, value, "GetAccount",
                (AccountModel result) => result.Id);
        }

        /**
         *  PUT: api/accounts/5
         *  OLD: UpdateAccount, SaveBasicInfo
         */
        [HttpPut("{id}")]
        public IActionResult UpdateAccount(int id, [FromBody]AccountModel value)
        {
            return Put(_service.UpdateAccount, value);
        }

        /**
         *  GET: api/accounts/names
         *  OLD: GetAccountNameDropDownOptions
         */
        [HttpGet("names")]
        public IActionResult GetAccountNames()
        {
            return Get(_service.GetAccountNames);
        }

        /**
         *  GET: api/accounts/statuses
         *  OLD: GetAccountStatuses
         */
        [HttpGet("statuses")]
        public IActionResult GetAccountStatuses()
        {
            return Get(_service.GetAccountStatuses);
        }
    }
}
