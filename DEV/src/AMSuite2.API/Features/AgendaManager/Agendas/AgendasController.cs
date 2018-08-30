using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using AMSuite2.API.Infrastructure.Controllers;
using AMSuite2.API.Infrastructure.Models;

namespace AMSuite2.API.Features.AgendaManager.Agendas
{
    [Route("api/agendas")]
    public class AgendasController : BaseController
    {
        private readonly IAgendasService _service;

        public AgendasController(IAgendasService service)
        {
            _service = service;
        }

        /**
         *  GET: api/agendas
         */
        [HttpGet]
        public IActionResult GetAgendas([FromQuery] QueryModel<AgendaModel> query)
        {
            return Get(_service.GetAgendas, query);
        }

        /**
         *  GET: api/agendas/5
         */
        [HttpGet("{id}", Name = "GetAgenda")]
        public IActionResult GetAgenda(int id)
        {
            return Get(_service.GetAgenda, id);
        }

        /**
         *  POST: api/agendas
         *  OLD: AgendaEdit, ConvertTemplateToAgenda
         */
        [HttpPost]
        public IActionResult AddAgenda([FromBody]AgendaModel model)
        {
            return Post(_service.AddAgenda, Audit(model), "GetAgenda");
        }

        /**
         *  PUT: api/agendas/5
         *  OLD: AgendaEdit, RestoreDeletedItem?, MarkAgendaForDelete?
         */
        [HttpPut("{id}")]
        public IActionResult UpdateAgenda(int id, [FromBody]AgendaModel model)
        {
            return Put(_service.UpdateAgenda, AuditExisting(model));
        }

        /**
         *  DELETE: api/agendas/5
         *  OLD: MarkAgendaForDelete
         */
        [HttpDelete("{id}")]
        public IActionResult DeleteAgenda(int id)
        {
            return Delete(_service.DeleteAgenda, id);
        }

        /**
         *  GET: api/agendas/5/meeting
         *  OLD: GetAgenda
         */
        [HttpGet("~/api/agendas/{agendaId}/meeting")]
        public IActionResult GetAgendaMeeting(int agendaId)
        {
            return Get(_service.GetAgendaMeeting, agendaId);
        }

        /**
         *  GET: api/meetings/deleted
         *  OLD: GetDeletedMeetings
         */
        [HttpGet("~/api/accounts/{accountId}/agendas/deleted")]
        public IActionResult GetDeletedAgendas(int accountId)
        {
            return Get(_service.GetDeletedAgendas, accountId);
        }
    }
}
