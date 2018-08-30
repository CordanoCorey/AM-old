using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using AMSuite2.API.Infrastructure.Controllers;

namespace AMSuite2.API.Features.Core.Profile
{
    [Route("api/profile")]
    public class ProfileController : BaseController
    {
        private readonly IProfileService _service;

        public ProfileController(IProfileService service)
        {
            _service = service;
        }

        /**
         *  GET: api/profile
         *  OLD: Profile
         */
        [HttpGet]
        public IActionResult GetProfile()
        {
            return Get(_service.GetProfile, UserId);
        }

        /**
         *  PUT: api/profile
         */
        [HttpPut]
        public IActionResult UpdateProfile([FromBody] ProfileModel model)
        {
            return Put(_service.UpdateProfile, model);
        }
    }
}
