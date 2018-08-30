using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AMSuite2.API.Infrastructure.Controllers;
using AMSuite2.API.Infrastructure.Models;
using Microsoft.AspNetCore.Mvc;

namespace AMSuite2.API.Features.AgendaManager.Notes
{
    [Route("api/notes")]
    public class NotesController : BaseController
    {
        private readonly INotesService _service;

        public NotesController(INotesService service)
        {
            _service = service;
        }

        /**
         *  GET: api/notes
         */
        [HttpGet]
        public IActionResult GetNotes([FromQuery] QueryModel<NotesModel> model)
        {
            return Get(_service.GetNotes, model);
        }

        /**
         *  GET: api/notes/5
         *  OLD: GetNotes
         */
        [HttpGet("{id}", Name = "GetNotes")]
        public IActionResult GetNotes(int id)
        {
            return Get(_service.GetNotes, id);
        }

        /**
         *  POST: api/notes
         */
        [HttpPost]
        public IActionResult AddNotes([FromBody]NotesModel model)
        {
            return Post(_service.AddNotes, Audit(model), "GetNotes");
        }

        /**
         *  PUT: api/notes/5
         */
        [HttpPut("{id}")]
        public IActionResult UpdateNotes(int id, [FromBody]NotesModel model)
        {
            return Put(_service.UpdateNotes, AuditExisting(model));
        }

        /**
         *  DELETE: api/notes/5
         *  OLD: DeleteNotes
         */
        [HttpDelete("{id}")]
        public IActionResult DeleteNotes(int id)
        {
            return Delete(_service.DeleteNotes, id);
        }

        /**
         *  GET: api/agendas/5/notes
         *  OLD: GetAgendaNotes
         */
        [HttpGet("~/api/agendas/{agendaId}/notes")]
        public IActionResult GetAgendaNotes(int agendaId)
        {
            return Get(_service.GetNotesForAgenda, agendaId, UserId);
        }

        /**
         *  GET: api/agendas/5/notes
         *  OLD: GetAgendaItemNotes
         */
        [HttpGet("~/api/agendaitems/{agendaItemId}/notes")]
        public IActionResult GetAgendaItemNotes(int agendaItemId)
        {
            return Get(_service.GetNotesForAgendaItem, agendaItemId, UserId);
        }

        /**
         *  GET: api/binitems/5/notes
         */
        [HttpGet("~/api/binitems/{binItemId}/notes")]
        public IActionResult GetBinItemNotes(int binItemId)
        {
            return Get(_service.GetNotesForBinItem, binItemId, UserId);
        }
    }
}
