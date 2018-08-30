using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using AMSuite2.API.Infrastructure.Controllers;
using AMSuite2.API.Infrastructure.Models;

namespace AMSuite2.API.Features.Core.Email
{
    [Route("api/email")]
    public class EmailController : BaseController
    {
        private readonly IEmailService _service;

        public EmailController(IEmailService service)
        {
            _service = service;
        }

        /**
         *  GET: api/email
         */
        [HttpGet]
        public IActionResult GetEmail(QueryModel<EmailModel> query)
        {
            return Get(_service.GetEmail, query);
        }

        /**
         *  GET: api/email/5
         */
        [HttpGet("{id}", Name = "GetEmailItem")]
        public IActionResult GetEmailItem(int id)
        {
            return Get(_service.GetEmailItem, id);
        }

        /**
         *  POST: api/email
         */
        [HttpPost]
        public IActionResult AddEmail([FromBody]EmailModel value)
        {
            return Post(_service.AddEmailItem, value, "GetEmailItem");
        }

        /**
         *  POST: api/email/invites
         *  OLD: ResendUserInvite
         */
        [HttpPost("invites")]
        public IActionResult AddInviteEmail([FromBody] EmailModel value)
        {
            return Post(_service.AddInviteEmailItem, value, "GetEmailItem");
        }

        /**
         *  POST: api/agendaitems/5/email
         *  OLD: SaveEmailItem, GetAgendaItemEmail
         */
        [HttpPost("~/api/agendaitems/{id}/email")]
        public IActionResult AddAgendaItemEmail(int id, [FromBody]EmailModel value)
        {
            return Post(_service.AddAgendaItemEmail, value, "GetAgendaItemEmail",
                (EmailModel model) => model.Id);
        }

        /**
         *  POST: api/meetings/5/email
         *  OLD: SaveMeetingDetailsEmail, GetMeetingDetailsEmail
         */
        [HttpPost("~/api/meetings/{id}/email")]
        public IActionResult AddMeetingEmail(int id, [FromBody]EmailModel value)
        {
            return Post(_service.AddMeetingEmail, value, "GetMeetingEmail",
                (EmailModel result) => result.Id);
        }
    }
}
