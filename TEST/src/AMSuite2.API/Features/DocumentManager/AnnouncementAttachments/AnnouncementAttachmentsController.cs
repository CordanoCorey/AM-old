using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AMSuite2.API.Infrastructure.Controllers;
using Microsoft.AspNetCore.Mvc;

namespace AMSuite2.API.Features.DocumentManager.AnnouncementAttachments
{
    [Route("api/attachments")]
    public class AnnouncementAttachmentsController : BaseController
    {
        private readonly IAnnouncementAttachmentsService _service;

        public AnnouncementAttachmentsController(IAnnouncementAttachmentsService service)
        {
            _service = service;
        }

        /**
         *  GET: api/announcements/5/attachments
         *  OLD: GetAnnouncementAttachments
         */
        [HttpGet("~/api/announcements/{announcementId}/attachments")]
        public IActionResult GetAnnouncementAttachments(int announcementId)
        {
            return Get(_service.GetAnnouncementAttachments, announcementId);
        }
    }
}