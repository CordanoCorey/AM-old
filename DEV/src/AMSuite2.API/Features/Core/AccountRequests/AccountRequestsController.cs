using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using AMSuite2.API.Infrastructure.Controllers;

namespace AMSuite2.API.Features.Core.AccountRequests
{
    [Route("api/accountrequests")]
    public class AccountRequestsController : BaseController
    {
        private readonly IAccountRequestsService _service;

        public AccountRequestsController(IAccountRequestsService service)
        {
            _service = service;
        }

        /**
         *  GET: api/accountrequests
         */
        [HttpGet("~/api/accounts/{accountId}/accountrequests")]
        public IActionResult GetAccountRequests(int accountId)
        {
            return Get(_service.GetAccountRequests, accountId);
        }

        /**
         *  GET: api/accountrequests/5
         */
        [HttpGet("{id}", Name = "GetAccountRequest")]
        public IActionResult GetAccountRequest(int id)
        {
            return Get(_service.GetAccountRequest, id);
        }

        /**
         *  POST: api/accountrequests
         *  OLD: NewAccountRequest
         */
        [HttpPost]
        public IActionResult AddAccountRequest([FromBody]AccountRequestModel value)
        {
            value.CreatedBy = UserId;
            return Post(_service.AddAccountRequest, value, "GetAccountRequest", x => x.Id);
        }

        /**
         *  DELETE: api/accountrequests/5
         */
        [HttpDelete("{id}")]
        public IActionResult DeleteAccountRequest(int id)
        {
            return Delete(_service.DeleteAccountRequest, id);
        }
    }
}
