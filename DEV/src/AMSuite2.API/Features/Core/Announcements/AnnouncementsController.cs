using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using AMSuite2.API.Infrastructure.Controllers;
using AMSuite2.API.Infrastructure.Models;

namespace AMSuite2.API.Features.Core.Announcements
{
    [Route("api/announcements")]
    public class AnnouncementsController : BaseController
    {
        private readonly IAnnouncementsService _service;

        public AnnouncementsController(IAnnouncementsService service)
        {
            _service = service;
        }

        /**
         *  GET: api/announcements
         *  OLD: Announcements
         */
        [HttpGet]
        public IActionResult GetAnnouncements(QueryModel<AnnouncementModel> query)
        {
            return Get(_service.GetAnnouncements, query);
        }

        /**
         *  GET: api/announcements/5
         */
        [HttpGet("{id}", Name = "GetAnnouncement")]
        public IActionResult GetAnnouncment(int id)
        {
            return Get(_service.GetAnnouncement, id);
        }

        /**
         *  POST: api/announcements
         *  OLD: AddAnnouncement
         */
        [HttpPost]
        public IActionResult AddAnnouncement([FromBody]AnnouncementModel model)
        {
            return Post(_service.AddAnnouncement, Audit(model), "GetAnnouncement");
        }

        /**
         *  PUT: api/announcements/5
         */
        [HttpPut("{id}")]
        public IActionResult UpdateAnnouncement(int id, [FromBody]AnnouncementModel model)
        {
            return Put(_service.UpdateAnnouncement, AuditExisting(model));
        }

        /**
         *  DELETE: api/announcements/5
         *  OLD: DeleteAnnouncement
         */
        [HttpDelete("{id}")]
        public IActionResult DeleteAnnouncement(int id)
        {
            return Delete(_service.DeleteAnnouncement, id);
        }
        
        /**
         *  GET: api/dashboard/announcements
         */
        [HttpGet("~/api/dashboard/announcements")]
        public IActionResult GetDashboardAnnouncements()
        {
            return Get(_service.GetDashboardAnnouncements, UserId);
        }

        /**
         *  GET: api/users/5/announcements
         *  OLD: GetOwnerAnnouncements
         */
        [HttpGet("~/api/users/{userId}/announcements")]
        public IActionResult GetUserAnnouncements(int userId)
        {
            return Get(_service.GetUserAnnouncements, userId);
        }

        /**
         *  GET: api/accounts/5/announcements
         */
        [HttpGet("~/api/accounts/{accountId}/announcements")]
        public IActionResult GetAccountAnnouncements(int accountId)
        {
            return Get(_service.GetAccountAnnouncements, accountId);
        }

        /**
         *  GET: api/groups/5/announcements
         */
        [HttpGet("~/api/groups/{groupId}/announcements")]
        public IActionResult GetGroupAnnouncements(int groupId)
        {
            return Get(_service.GetGroupAnnouncements, groupId);
        }
    }
}
