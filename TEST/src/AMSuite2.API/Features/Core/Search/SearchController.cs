using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using AMSuite2.API.Infrastructure.Controllers;

namespace AMSuite2.API.Features.Core.Search
{
    [Route("api/search")]
    public class SearchController : BaseController
    {
        private readonly ISearchService _service;

        public SearchController(ISearchService service)
        {
            _service = service;
        }

        // POST: api/search
        // OLD: GetSearchResults
        [HttpPost]
        public IActionResult Search([FromBody]SearchFiltersModel value)
        {
            return Post(_service.Search, value);
        }
    }
}
