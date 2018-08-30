using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AMSuite2.API.Infrastructure.Controllers;
using Microsoft.AspNetCore.Mvc;

namespace AMSuite2.API.Features.DocumentManager.BinItemAttachments
{
    [Route("api/attachments")]
    public class BinItemAttachmentsController : BaseController
    {
        private readonly IBinItemAttachmentsService _service;

        public BinItemAttachmentsController(IBinItemAttachmentsService service)
        {
            _service = service;
        }

        /**
         *  GET: api/binitems/5/attachments
         */
        [HttpGet("~/api/binitems/{binitemId}/attachments")]
        public IActionResult GetBinItemAttachments(int binitemId)
        {
            return Get(_service.GetBinItemAttachments, binitemId);
        }
    }
}