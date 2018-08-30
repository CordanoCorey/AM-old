using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AMSuite2.API.Infrastructure.Controllers;
using Microsoft.AspNetCore.Mvc;

namespace AMSuite2.API.Features.AgendaManager.Suggestions
{
    [Route("api/suggestions")]
    public class SuggestionsController : BaseController
    {
        private readonly ISuggestionsService _service;

        public SuggestionsController(ISuggestionsService service)
        {
            _service = service;
        }

        /**
         * GET: api/suggestions
         */
        [HttpGet]
        public IActionResult GetSuggestions()
        {
            return Get(_service.GetSuggestions);
        }

        /**
         * GET: api/suggestions/5
         */
        [HttpGet("{id}", Name = "GetSuggestion")]
        public IActionResult GetSuggestion(int id)
        {
            return Get(_service.GetSuggestion, id);
        }

        /**
         *  POST: api/suggestions
         */
        [HttpPost]
        public IActionResult AddSuggestion([FromBody]SuggestionModel value)
        {
            return Post(_service.AddSuggestion, value, "GetSuggestion");
        }

        /**
         *  PUT: api/suggestions/5
         */
        [HttpPut("{id}")]
        public IActionResult UpdateSuggestion(int id, [FromBody]SuggestionModel value)
        {
            return Put(_service.UpdateSuggestion, value);
        }

        /**
         *  DELETE: api/suggestions/5
         */
        [HttpDelete("{id}")]
        public IActionResult DeleteSuggestion(int id)
        {
            return Delete(_service.DeleteSuggestion, id);
        }
    }
}
