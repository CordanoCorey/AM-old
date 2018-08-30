using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AMSuite2.API.Infrastructure.Controllers;
using Microsoft.AspNetCore.Mvc;
using AMSuite2.API.Infrastructure.Models;

namespace AMSuite2.API.Features.AgendaManager.AgendaItems
{
    [Route("api/agendaitems")]
    public class AgendaItemsController : BaseController
    {
        private readonly IAgendaItemsService _service;

        public AgendaItemsController(IAgendaItemsService service)
        {
            _service = service;
        }

        /**
         *  GET: api/agendas
         */
        [HttpGet]
        public IActionResult GetAgendaItems([FromQuery] QueryModel<AgendaItemModel> query)
        {
            return Get(_service.GetAgendaItems, query);
        }

        /**
         *  GET: api/agendas/5/agendaitems
         *  OLD: GetAgendaTreeView, GetAgendaDescriptions
         */
        [HttpGet("~/api/agendas/{agendaId}/agendaitems")]
        public IActionResult GetAgendaItems(int agendaId)
        {
            return Get(_service.GetAgendaItems, agendaId);
        }

        /**
         *  GET: api/agendaitems/5
         *  OLD: GetAgendaItem, GetAgendaItemDescriptions, GetAgendaItemOptions
         */
        [HttpGet("{id}", Name = "GetAgendaItem")]
        public IActionResult GetAgendaItem(int id)
        {
            return Get(_service.GetAgendaItem, id);
        }

        /**
         *  POST: api/agendaitems
         *  OLD: SaveAgendaItem
         */
        [HttpPost]
        public IActionResult AddAgendaItem([FromBody]AgendaItemModel model)
        {
            return Post(_service.AddAgendaItem, Audit(model), "GetAgendaItem");
        }

        /**
         *  PUT: api/agendaitems/5
         *  OLD: SaveAgendaItem, ReorderAgendaItemOver, ReorderAgendaItemBeforeAfter
         */
        [HttpPut("{id}")]
        public IActionResult UpdateAgendaItem(int id, [FromBody]AgendaItemModel model)
        {
            return Put(_service.UpdateAgendaItem, AuditExisting(model));
        }

        /**
         *  DELETE: api/agendaitems/5
         *  OLD: DeleteAgendaItem
         */
        [HttpDelete("{id}")]
        public IActionResult DeleteAgendaItem(int id)
        {
            return Delete(_service.DeleteAgendaItem, id);
        }
        
        /**
         *  GET: api/meetings/5/agendaitems
         *  OLD: GetMeetingTreeView
         */
        [HttpGet("~/api/meetings/{meetingId}/agendaitems")]
        public IActionResult GetMeetingAgendaItems(int meetingId)
        {
            return Get(_service.GetMeetingAgendaItems, meetingId);
        }
    }
}
