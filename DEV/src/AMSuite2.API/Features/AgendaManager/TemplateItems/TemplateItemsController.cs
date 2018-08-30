using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AMSuite2.API.Infrastructure.Controllers;
using Microsoft.AspNetCore.Mvc;

namespace AMSuite2.API.Features.AgendaManager.TemplateItems
{
    [Route("api/templateitems")]
    public class TemplateItemsController : BaseController
    {
        private readonly ITemplateItemsService _service;

        public TemplateItemsController(ITemplateItemsService service)
        {
            _service = service;
        }

        /**
         *  GET: api/templates/5/items
         *  OLD: GetOutlineFormats
         */
        [HttpGet("~/api/templates/{templateId}/items")]
        public IActionResult GetTemplateItems(int templateId)
        {
            return Get(_service.GetTemplateItems, templateId);
        }

        /**
         *  GET: api/templateitems/5
         *  OLD: GetTemplateItemTreeView
         */
        [HttpGet("{id}", Name = "GetTemplateItem")]
        public IActionResult GetTemplateItem(int id)
        {
            return Get(_service.GetTemplateItem, id);
        }

        /**
         *  POST: api/templates
         *  OLD: SaveTemplateItem
         */
        [HttpPost]
        public IActionResult AddTemplateItem([FromBody]TemplateItemModel model)
        {
            return Post(_service.AddTemplateItem, Audit(model), "GetTemplateItem");
        }

        /**
         *  PUT: api/templates/5
         *  OLD: SaveTemplateItem
         */
        [HttpPut("{id}")]
        public IActionResult UpdateTemplateItem(int id, [FromBody]TemplateItemModel model)
        {
            return Put(_service.UpdateTemplateItem, AuditExisting(model));
        }

        /**
         *  DELETE: api/templates/5
         *  OLD: DeleteTemplateItem
         */
        [HttpDelete("{id}")]
        public IActionResult DeleteTemplateItem(int id)
        {
            return Delete(_service.DeleteTemplateItem, id);
        }
    }
}
