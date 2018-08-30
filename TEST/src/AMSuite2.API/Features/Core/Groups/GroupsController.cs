using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using AMSuite2.API.Infrastructure.Controllers;
using AMSuite2.API.Infrastructure.Models;

namespace AMSuite2.API.Features.Core.Groups
{
    [Route("api/groups")]
    public class GroupsController : BaseController
    {
        private readonly IGroupsService _service;

        public GroupsController(IGroupsService service)
        {
            _service = service;
        }

        /**
         *  GET: api/groups
         *  OLD: Groups, GroupsFilter
         */
        [HttpGet]
        public IActionResult GetGroups([FromQuery] QueryModel<GroupModel> query = null)
        {
            return Get(_service.GetGroups, query);
        }

        /**
         *  GET: api/groups/5
         */
        [HttpGet("{id}", Name = "GetGroup")]
        public IActionResult GetGroup(int id)
        {
            return Get(_service.GetGroup, id);
        }

        /**
         *  POST: api/groups
         *  OLD: AddGroup
         */
        [HttpPost]
        public IActionResult AddGroup([FromBody]GroupModel model)
        {
            return Post(_service.AddGroup, Audit(model), "GetGroup");
        }

        /**
         *  PUT: api/groups/5
         */
        [HttpPut("{id}")]
        public IActionResult UpdateGroup(int id, [FromBody]GroupModel model)
        {
            return Put(_service.UpdateGroup, AuditExisting(model));
        }

        /**
         *  DELETE: api/groups/5
         *  OLD: DeleteGroup
         */
        [HttpDelete("{id}")]
        public IActionResult DeleteGroup(int id)
        {
            return Delete(_service.DeleteGroup, id);
        }

        /**
         *  GET: api/accounts/5/groups
         *  OLD: GetAccountGroupsById, GetAccountGroupsByUrl
         */
        [HttpGet("~/api/accounts/{accountId}/groups")]
        public IActionResult GetAccountGroups(int accountId)
        {
            return Get(_service.GetAccountGroups, accountId);
        }

        /**
         *  GET: api/meetings/5/groups
         *  OLD: GetMeetingGroups
         */
        [HttpGet("~/api/meetings/{meetingId}/groups")]
        public IActionResult GetMeetingGroups(int meetingId)
        {
            return Get(_service.GetMeetingGroups, meetingId);
        }

        /**
         *  GET: api/groups
         *  OLD: Groups, GroupsFilter
         */
        [HttpGet("admin")]
        public IActionResult GetAdministratorGroups()
        {
            return Get(_service.GetAdministratorGroups, UserId);
        }
    }
}
