using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AMSuite2.API.Infrastructure.Controllers;
using AMSuite2.API.Infrastructure.Models;
using Microsoft.AspNetCore.Mvc;

namespace AMSuite2.API.Features.AgendaManager.Minutes
{
    [Route("api/minutes")]
    public class MinutesController : BaseController
    {
        private readonly IMinutesService _service;

        public MinutesController(IMinutesService service)
        {
            _service = service;
        }

        /**
         *  GET: api/minutes
         */
        [HttpGet]
        public IActionResult GetMinutes([FromQuery]QueryModel<MinutesModel> query)
        {
            return Get(_service.GetMinutes, query);
        }

        /**
         *  GET: api/minutes/5
         *  OLD: GetMinutes
         */
        [HttpGet("{id}", Name = "GetMinutes")]
        public IActionResult GetMinutes(int id)
        {
            return Get(_service.GetMinutes, id);
        }

        /**
         *  POST: api/minutes
         *  OLD: SaveMinutes
         */
        [HttpPost]
        public IActionResult AddMinutes([FromBody]MinutesModel model)
        {
            return Post(_service.AddMinutes, Audit(model), "GetMinutes");
        }

        /**
         *  PUT: api/minutes/5
         *  OLD: SaveMinutes
         */
        [HttpPut("{id}")]
        public IActionResult UpdateMinutes(int id, [FromBody]MinutesModel model)
        {
            return Put(_service.UpdateMinutes, AuditExisting(model));
        }

        /**
         *  DELETE: api/minutes/5
         *  OLD: DeleteMinutes
         */
        [HttpDelete("{id}")]
        public IActionResult DeleteMinutes(int id)
        {
            return Delete(_service.DeleteMinutes, id);
        }

        /**
         *  GET: api/agendas/5/minutes
         *  OLD: GetAgendaMinutes
         */
        [HttpGet("~/api/agendas/{agendaId}/minutes")]
        public IActionResult GetAgendaMinutes(int agendaId)
        {
            return Get(_service.GetMinutesForAgenda, agendaId, UserId);
        }

        /**
         *  GET: api/agendas/5/minutes
         *  OLD: GetAgendaItemMinutes, GetMinutes
         */
        [HttpGet("~/api/agendaitems/{agendaItemId}/minutes")]
        public IActionResult GetAgendaItemMinutes(int agendaItemId)
        {
            return Get(_service.GetMinutesForAgendaItem, agendaItemId, UserId);
        }

        /**
         *  GET: api/binitems/5/minutes
         */
        [HttpGet("~/api/binitems/{binItemId}/minutes")]
        public IActionResult GetBinItemMinutes(int binItemId)
        {
            return Get(_service.GetMinutesForBinItem, binItemId, UserId);
        }
    }
}
