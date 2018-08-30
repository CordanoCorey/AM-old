using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AMSuite2.API.Infrastructure.Controllers;
using Microsoft.AspNetCore.Mvc;

namespace AMSuite2.API.Features.DocumentManager.SuggestionAttachments
{
    [Route("api/suggestions")]
    public class SuggestionAttachmentsController : BaseController
    {
        /**
         *  GET: api/suggestions/5/attachments
         */
        [HttpGet("~/api/suggestions/{suggestionId}/attachments")]
        public string GetSuggestionAttachments(int suggestionId)
        {
            return "value";
        }
    }
}