using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using AMSuite2.API.Infrastructure.Controllers;
using AMSuite2.Entities.Identity;
using Microsoft.AspNetCore.Identity;

namespace AMSuite2.API.Features.Core.Login
{
    [Route("api/login")]
    public class LoginController : BaseController
    {
        private readonly ILoginService _service;
        private readonly SignInManager<ApplicationUser> _signInManager;

        public LoginController(ILoginService service, SignInManager<ApplicationUser> signInManager)
        {
            _service = service;
            _signInManager = signInManager;
        }

        /**
         *  POST api/login
         *  OLD: AM/SendInfo, Login/Login
         */
        //[HttpPost("~/api/login")]
        //public async Task<IActionResult> Login([FromBody]LoginModel model)
        //{
        //    var user = await _service.Login(model.EmailAddress);
        //    return Ok(user);
        //}

        /**
         *  POST: api/recoverpassword
         *  OLD: ResetPassword
         */
        [HttpPost("~/api/recoverpassword")]
        public IActionResult RecoverPassword([FromBody]RecoverPasswordModel model)
        {
            return Post(_service.RecoverPassword, model.EmailAddress);
        }

        /**
         *  POST: api/resetpassword
         *  OLD: ResetPassword
         */
        [HttpPost("~/api/resetpassword")]
        public IActionResult ResetPassword([FromBody]ResetPasswordModel value)
        {
            return Post(_service.ResetPassword, value);
        }
    }
}
