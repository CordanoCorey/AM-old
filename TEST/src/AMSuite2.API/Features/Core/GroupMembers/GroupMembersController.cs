using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using AMSuite2.API.Infrastructure.Controllers;
using AMSuite2.API.Infrastructure.Models;

namespace AMSuite2.API.Features.Core.GroupMembers
{
    [Route("api/groups")]
    public class GroupMembersController : BaseController
    {
        private readonly IGroupMembersService _service;

        public GroupMembersController(IGroupMembersService service)
        {
            _service = service;
        }

        /**
         *  GET: api/groups/5/members
         *  OLD: GetGroupMembers, GroupMembers, GroupAttendees
         */
        [HttpGet("{groupId}/members")]
        public IActionResult GetGroupMembers(int groupId, [FromQuery]QueryModel<GroupMemberModel> query)
        {
            return query.IsNullOrDefault ? Get(_service.GetGroupMembers, groupId) : Get(_service.GetGroupMembers, groupId, query);
        }

        /**
         *  GET: api/groups/5/members/6
         */
        [HttpGet("{groupId}/members/{userId}")]
        public IActionResult GetGroupMember(int groupId, int userId)
        {
            return Get(_service.GetGroupMember, groupId, userId);
        }

        /**
         *  POST: api/groups/5/members
         *  OLD: MemberEdit
         */
        [HttpPut("{groupId}/members")]
        public IActionResult UpdateGroupMembers(int groupId, [FromBody]IEnumerable<GroupMemberModel> value)
        {
            return Put(_service.UpdateGroupMembers, groupId, value);
        }

        /**
         *  GET: api/users/5/groups
         *  OLD: GetMemberWithRoleById, GetGroupsWithAllGroupsById, UserGroupsWithAllGroups, GroupAdministratorGroups
         */
        [HttpGet("~/api/users/{userId}/groups")]
        public IActionResult GetUserGroups(int userId, [FromQuery]int? accountId = 0)
        {
            return Get(_service.GetUserGroups, userId);
        }

        /**
         *  PUT: api/users/5/groups
         *  OLD: MemberEdit, MemberEditById
         */
        [HttpPut("~/api/users/{userId}/groups")]
        public IActionResult UpdateUserGroups(int userId, [FromBody]IEnumerable<GroupMemberModel> value, [FromQuery]int? accountId = 0)
        {
            return Put(_service.UpdateUserGroups, userId, value);
        }
    }
}
