using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using AMSuite2.API.Infrastructure.Controllers;

namespace AMSuite2.API.Features.Core.Notifications
{
    [Route("api/notifications")]
    public class NotificationsController : BaseController
    {
        private readonly INotificationsService _service;

        public NotificationsController(INotificationsService service)
        {
            _service = service;
        }

        /**
         *  GET: api/notifications
         */
        [HttpGet]
        public IActionResult GetNotifications()
        {
            return Get(_service.GetUserNotifications, UserId);
        }

        /**
         *  POST: api/notifications
         */
        [HttpPost]
        public IActionResult AddNotification([FromBody]NotificationModel model)
        {
            return Post(_service.AddNotification, AuditNew(model), "GetNotification");
        }

        /**
         *  GET: api/notifications/5
         */
        [HttpGet("{id}", Name = "GetNotification")]
        public IActionResult GetNotification(int id)
        {
            return Get(_service.GetNotification, id);
        }

        /**
         *  PUT: api/notifications/5
         */
        [HttpPut("{id}")]
        public IActionResult UpdateNotification(int id, [FromBody]NotificationModel model)
        {
            return Put(_service.UpdateNotification, model);
        }

        /**
         *  DELETE: api/notifications/5
         */
        [HttpDelete("{id}")]
        public IActionResult DeleteNotification(int id)
        {
            return Delete(_service.DeleteNotification, id);
        }

        /**
         *  GET: api/dashboard/notifications
         *  OLD: GetDashboardNotifications
         */
        [HttpGet("~/api/dashboard/notifications")]
        public IActionResult GetDashboardNotifications()
        {
            return Get(_service.GetDashboardNotifications, UserId);
        }
    }
}
