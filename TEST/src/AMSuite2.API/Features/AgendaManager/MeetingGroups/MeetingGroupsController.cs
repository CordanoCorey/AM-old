using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AMSuite2.API.Infrastructure.Controllers;
using Microsoft.AspNetCore.Mvc;

namespace AMSuite2.API.Features.AgendaManager.MeetingGroups
{
    [Route("api/meetings")]
    public class MeetingGroupsController : BaseController
    {
        private readonly IMeetingGroupsService _service;

        public MeetingGroupsController(IMeetingGroupsService service)
        {
            _service = service;
        }

        /**
         *  GET: api/meetings/5/groups
         *  OLD: GetMeetingGroups
         */
        [HttpGet("{id}/groups")]
        public IActionResult GetMeetingGroups(int id)
        {
            return Get(_service.GetMeetingGroups, id);
        }
    }
}
