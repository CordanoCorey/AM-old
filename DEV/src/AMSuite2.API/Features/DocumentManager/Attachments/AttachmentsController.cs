using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AMSuite2.API.Infrastructure.Controllers;
using AMSuite2.API.Infrastructure.Models;
using Microsoft.AspNetCore.Mvc;

namespace AMSuite2.API.Features.DocumentManager.Attachments
{
    [Route("api/attachments")]
    public class AttachmentsController : BaseController
    {
        private readonly IAttachmentsService _service;

        public AttachmentsController(IAttachmentsService service)
        {
            _service = service;
        }

        // GET: api/attachments
        [HttpGet]
        public IActionResult GetAttachments(QueryModel<AttachmentModel> query)
        {
            return Get(_service.GetAttachments, query);
        }

        // GET: api/attachments/5
        [HttpGet("{id}")]
        public IActionResult GetAttachment(int id)
        {
            return Get(_service.GetAttachment, id);
        }

        // POST: api/attachments
        [HttpPost]
        public IActionResult AddAttachment([FromBody]AttachmentModel model)
        {
            return Post(_service.AddAttachment, Audit(model));
        }

        // PUT: api/attachments/5
        [HttpPut("{id}")]
        public IActionResult UpdateAttachment(int id, [FromBody]AttachmentModel model)
        {
            return Put(_service.UpdateAttachment, AuditExisting(model));
        }

        // DELETE: api/attachments/5
        [HttpDelete("{id}")]
        public IActionResult DeleteAttachment(int id)
        {
            return Delete(_service.DeleteAttachment, id);
        }

        /**
         *  GET: api/agendaitems/5/attachments
         *  OLD: GetAgendaItemAttachments
         */
        [HttpGet("~/api/agendaitems/{agendaItemId}/attachments", Name = "GetAgendaItemAttachments")]
        public IActionResult GetAgendaItemAttachments(int agendaItemId)
        {
            return Get(_service.GetAgendaItemAttachments, agendaItemId);
        }

        /**
         *  POST: api/agendaitems/5/attachments
         */
        [HttpPost("~/api/agendaitems/{agendaItemId}/attachments")]
        public IActionResult SaveAgendaItemAttachments(int agendaItemId, [FromBody]IEnumerable<AttachmentModel> model)
        {
            var attachments = model.Select(x => Audit(x));
            return Post(_service.SaveAgendaItemAttachments, agendaItemId, attachments, "GetAgendaItemAttachments");
        }

        /**
         *  DELETE: api/agendaitems/5/attachments/5
         */
        [HttpDelete("~/api/agendaitems/{agendaItemId}/attachments")]
        public IActionResult DeleteAgendaItemAttachments(int agendaItemId)
        {
            return Delete(_service.DeleteAgendaItemAttachments, agendaItemId);
        }

        /**
         *  GET: api/agendas/5/attachments
         *  OLD: GetAgendaAttachments
         */
        [HttpGet("~/api/agendas/{agendaId}/attachments", Name = "GetAgendaAttachments")]
        public IActionResult GetAgendaAttachments(int agendaId)
        {
            return Get(_service.GetAgendaAttachments, agendaId);
        }
    }
}
