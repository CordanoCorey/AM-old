using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AMSuite2.API.Infrastructure.Controllers;
using Microsoft.AspNetCore.Mvc;

namespace AMSuite2.API.Features.AgendaManager.BinItems
{
    [Route("api/binitems")]
    public class BinItemsController : BaseController
    {
        private readonly IBinItemsService _service;

        public BinItemsController(IBinItemsService service)
        {
            _service = service;
        }

        /**
         *  GET: api/binitems
         *  OLD: GeBinItem
         */
        [HttpGet]
        public IActionResult GetBinItems()
        {
            return Get(_service.GetBinItems, UserId);
        }

        /**
         *  GET: api/binitems/5
         *  OLD: GetBinItemForPreview, CopyFromBin
         */
        [HttpGet("{id}", Name = "GetBinItem")]
        public IActionResult GetBinItem(int id)
        {
            return Get(_service.GetBinItem, id);
        }

        /**
         *  POST: api/binitems
         *  OLD: CopyToBin
         */
        [HttpPost]
        public IActionResult AddBinItem([FromBody]BinItemModel model)
        {
            return Post(_service.AddBinItem, Audit(model), "GetBinItem");
        }

        /**
         *  PUT: api/binitems/5
         */
        [HttpPut("{id}")]
        public IActionResult UpdateBinItem(int id, [FromBody]BinItemModel model)
        {
            return Put(_service.UpdateBinItem, AuditExisting(model));
        }

        /**
         *  DELETE: api/binitems/5
         *  OLD: RemoveFromBin
         */
        [HttpDelete("{id}")]
        public IActionResult DeleteBinItem(int id)
        {
            return Delete(_service.DeleteBinItem, id);
        }
    }
}
