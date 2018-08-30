using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AMSuite2.API.Infrastructure.Controllers;
using AMSuite2.API.Infrastructure.Models;
using Microsoft.AspNetCore.Mvc;

namespace AMSuite2.API.Features.DocumentManager.EmailAttachments
{
    [Route("api/emailattachments")]
    public class EmailAttachmentsController : BaseController
    {
        private readonly IEmailAttachmentsService _service;

        public EmailAttachmentsController(IEmailAttachmentsService service)
        {
            _service = service;
        }

        // GET: api/email/5/attachments
        [HttpGet]
        public IActionResult GetEmailAttachments(QueryModel<EmailAttachmentModel> query)
        {
            return Get(_service.GetEmailAttachments, query);
        }

        // GET: api/attachments/5
        [HttpGet("{id}")]
        public IActionResult GetEmailAttachment(int id)
        {
            return Get(_service.GetEmailAttachment, id);
        }

        // POST: api/attachments
        [HttpPost]
        public IActionResult AddEmailAttachment([FromBody]EmailAttachmentModel model)
        {
            return Post(_service.AddEmailAttachment, Audit(model));
        }

        // PUT: api/attachments/5
        [HttpPut("{id}")]
        public IActionResult UpdateEmailAttachment(int id, [FromBody]EmailAttachmentModel model)
        {
            return Put(_service.UpdateEmailAttachment, AuditExisting(model));
        }

        // DELETE: api/attachments/5
        [HttpDelete("{id}")]
        public IActionResult DeleteEmailAttachment(int id)
        {
            return Delete(_service.DeleteEmailAttachment, id);
        }
    }
}
