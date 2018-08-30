using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AMSuite2.API.Features.Core.Accounts;
using AMSuite2.API.Infrastructure.Controllers;
using Microsoft.AspNetCore.Mvc;

namespace AMSuite2.API.Features.Core.AccountLogo
{
    [Route("api/accounts")]
    public class AccountsController : BaseController
    {
        private readonly IAccountLogoService _service;
        public AccountsController(IAccountLogoService service)
        {
            _service = service;
        }

        /**
         *  GET: api/accounts/5/logo
         *  OLD: GetAccountLogo
         */
        [HttpGet("{id}/logo", Name = "GetAccountLogo")]
        public IActionResult GetAccountLogo(int id)
        {
            return Get(_service.GetAccountLogo, id);
        }

        /**
         *  POST: api/accounts/5/logo
         */
        [HttpPost("{id}/logo")]
        public IActionResult AddAccountLogo(int id, [FromBody]AccountLogoModel model)
        {
            model.AccountId = id;
            return Post(_service.AddAccountLogo, AuditNew(model), "GetAccountLogo",
                (AccountLogoModel result) => result.AccountId);
        }

        /**
         *  PUT: api/accounts/5/logo
         */
        [HttpPut("{id}/logo")]
        public IActionResult UpdateAccountLogo(int id, [FromBody]AccountLogoModel model)
        {
            model.AccountId = id;
            return Put(_service.UpdateAccountLogo, AuditNew(model));
        }
    }
}
