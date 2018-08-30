using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AMSuite2.API.Infrastructure.Controllers;
using AMSuite2.API.Infrastructure.Models;
using Microsoft.AspNetCore.Mvc;

namespace AMSuite2.API.Features.Core.Users
{
    [Route("api/users")]
    public class UsersController : BaseController
    {
        private readonly IUsersService _service;

        public UsersController(IUsersService service)
        {
            _service = service;
        }

        /**
         *  GET: api/users
         *  OLD: GetExistingUsers
         */
        [HttpGet]
        public IActionResult GetUsers([FromQuery] QueryModel<UserModel> query)
        {
            return Get(_service.GetUsers, query);
        }

        /**
         *  GET: api/users/5
         */
        [HttpGet("{id}", Name = "GetUser")]
        public IActionResult GetUser(int id)
        {
            return Get(_service.GetUser, id);
        }

        /**
         *  POST: api/users
         *  OLD: MemberEdit
         */
        [HttpPost]
        public IActionResult AddUser([FromBody]UserModel value)
        {
            return Post(_service.AddUser, value, "GetUser");
        }

        /**
         *  PUT: api/users/5
         */
        [HttpPut("{id}")]
        public IActionResult UpdateUser(int id, [FromBody]UserModel value)
        {
            return Put(_service.UpdateUser, value);
        }

        /**
         *  DELETE: api/users/5
         */
        [HttpDelete("{id}")]
        public IActionResult DeleteUser(int id)
        {
            return Delete(_service.DeleteUser, id);
        }

        /**
         *  GET: api/users/5/roles
         *  OLD: UsersGroupsWithRoles, MemberWithRole
         */
        [HttpGet("{id}/roles")]
        public IActionResult GetUserRoles(int id)
        {
            return Get(_service.GetUserRoles, id);
        }

        /**
         *  GET: api/groups/5/users
         *  OLD: GroupAttendees
         */
        [HttpGet("~/api/groups/{groupId}/users")]
        public IActionResult GetGroupUsers(int groupId)
        {
            return Get(_service.GetGroupUsers, groupId);
        }
    }
}
