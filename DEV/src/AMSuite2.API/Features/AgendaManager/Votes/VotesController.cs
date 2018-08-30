using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AMSuite2.API.Infrastructure.Controllers;
using AMSuite2.API.Infrastructure.Models;
using Microsoft.AspNetCore.Mvc;

namespace AMSuite2.API.Features.AgendaManager.Votes
{
    [Route("api/votes")]
    public class VotesController : BaseController
    {
        private readonly IVotesService _service;

        public VotesController(IVotesService service)
        {
            _service = service;
        }

        /**
         *  GET: api/votes
         */
        [HttpGet]
        public IActionResult GetVotes([FromQuery] QueryModel<VoteModel> query)
        {
            return Get(_service.GetVotes, query);
        }

        /**
         *  GET: api/votes/5
         *  OLD: GetVoteResults
         */
        [HttpGet("{id}", Name = "GetVote")]
        public IActionResult GetVote(int id)
        {
            return Get(_service.GetVote, id);
        }

        /**
         *  POST: api/votes
         *  OLD: PlaceAllVotes
         */
        [HttpPost]
        public IActionResult AddVote([FromBody]VoteModel model)
        {
            return Post(_service.AddVote, Audit(model), "GetVote");
        }

        /**
         *  DELETE: api/votes/5
         */
        [HttpDelete("{id}")]
        public IActionResult DeleteVote(int id)
        {
            return Delete(_service.DeleteVote, id);
        }

        /**
         *  DELETE: api/votes/5
         */
        [HttpPut("{id}")]
        public IActionResult UpdateVote(int id, [FromBody]VoteModel model)
        {
            return Put(_service.UpdateVote, AuditExisting(model));
        }

        /**
         *  GET: api/agenda/5/votes
         *  OLD: GetAgendaVoting
         */
        [HttpGet("~/api/agendas/{agendaId}/votes")]
        public IActionResult GetAgendaVotes(int agendaId)
        {
            return Get(_service.GetAgendaVotes, agendaId);
        }

        /**
         *  GET: api/agendaitems/5/votes
         *  OLD: GetAgendaItemVoting, GetAllVoteResults
         */
        [HttpGet("~/api/agendaitems/{agendaItemId}/votes", Name = "GetAgendaItemVotes")]
        public IActionResult GetAgendaItemVotes(int agendaItemId)
        {
            return Get(_service.GetAgendaItemVotes, agendaItemId);
        }

        /**
         *  DELETE: api/agendaitems/5/votes
         */
        [HttpDelete("~/api/agendaitems/{agendaItemId}/votes")]
        public IActionResult DeleteAgendaItemVotes(int agendaItemId)
        {
            return Delete(_service.DeleteAgendaItemVotes, agendaItemId);
        }

        /**
         *  POST: api/agendaitems/5/votes
         *  OLD: PlaceAllVotes
         */
        [HttpPost("~/api/agendaitems/{agendaItemId}/votes")]
        public IActionResult UpdateAgendaItemVotes(int agendaItemId, [FromBody]IEnumerable<VoteModel> model)
        {
            var votes = model.Select(x => Audit(x));
            return Post(_service.SaveAgendaItemVotes, agendaItemId, votes, "GetAgendaItemVotes");
        }
    }
}
