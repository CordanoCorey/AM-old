using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using AMSuite2.API.Infrastructure.Controllers;

namespace AMSuite2.API.Features.Core.Dashboard
{
    [Route("api/dashboard")]
    public class DashboardController : BaseController
    {
        private readonly IDashboardService _service;

        public DashboardController(IDashboardService service)
        {
            _service = service;
        }

        /**
         *  GET: api/dashboard
         *  OLD: GetDashboardAgenda, GetDashboardNotifications
         */
        [HttpGet]
        public IActionResult GetDashboard()
        {
            return Get(_service.GetDashboard, UserId);
        }

        /**
         *  GET: api/dashboard/message
         *  OLD: GetSysAdminAnnouncement
         */
        [HttpGet("message")]
        public IActionResult GetDashboardMessage()
        {
            return Get(_service.GetDashboardMessage);
        }

        /**
         *  PUT: api/dashboard/message
         *  OLD: UpdateSysAdminAnnouncement
         */
        [HttpPost("message")]
        public IActionResult UpdateDashboardMessage([FromBody]DashboardMessageModel value)
        {
            return Post(_service.UpdateDashboardMessage, Audit(value));
        }
    }
}
