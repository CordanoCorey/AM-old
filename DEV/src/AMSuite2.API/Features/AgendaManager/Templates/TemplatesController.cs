using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AMSuite2.API.Infrastructure.Controllers;
using AMSuite2.API.Infrastructure.Models;
using Microsoft.AspNetCore.Mvc;

namespace AMSuite2.API.Features.AgendaManager.Templates
{
    [Route("api/templates")]
    public class TemplatesController : BaseController
    {
        private readonly ITemplatesService _service;

        public TemplatesController(ITemplatesService service)
        {
            _service = service;
        }

        /**
         *  GET: api/templates
         *  OLD: GetOutlineFormats
         */
        [HttpGet]
        public IActionResult GetTemplates([FromQuery] QueryModel<TemplateModel> query)
        {
            return Get(_service.GetTemplates, query);
        }

        /**
         *  GET: api/templates/5
         *  OLD: GetTemplateTreeView
         */
        [HttpGet("{id}", Name = "GetTemplate")]
        public IActionResult GetTemplates(int id)
        {
            return Get(_service.GetTemplate, id);
        }

        /**
         *  POST: api/templates
         *  OLD: SaveTemplate
         */
        [HttpPost]
        public IActionResult AddTemplate([FromBody]TemplateModel model)
        {
            return Post(_service.AddTemplate, Audit(model), "GetTemplate");
        }

        /**
         *  PUT: api/templates/5
         *  OLD: SaveTemplate
         */
        [HttpPut("{id}")]
        public IActionResult UpdateTemplate(int id, [FromBody]TemplateModel model)
        {
            return Put(_service.UpdateTemplate, AuditExisting(model));
        }

        /**
         *  DELETE: api/templates/5
         *  OLD: DeleteTemplate
         */
        [HttpDelete("{id}")]
        public IActionResult DeleteTemplate(int id)
        {
            return Delete(_service.DeleteTemplate, id);
        }

        /**
         *  GET: api/user/templates
         *  OLD: GetUserTemplates
         */
        [HttpGet("~/api/users/{userId}/templates")]
        public IActionResult GetUserTemplates(int userId)
        {
            return Get(_service.GetUserTemplates, userId);
        }
    }
}
