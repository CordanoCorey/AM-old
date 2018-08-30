using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AMSuite2.API.Infrastructure.Controllers;
using AMSuite2.API.Infrastructure.Models;
using Microsoft.AspNetCore.Mvc;

namespace AMSuite2.API.Features.DocumentManager.Files
{
    [Route("api/files")]
    public class FilesController : BaseController
    {
        private readonly IFilesService _service;

        public FilesController(IFilesService service)
        {
            _service = service;
        }

        /**
         *  GET: api/files
         */
        [HttpGet]
        public IActionResult GetFiles(QueryModel<FileModel> query)
        {
            return Get(_service.GetFiles, query);
        }

        /**
         *  GET: api/files/5
         */
        [HttpGet("{id}", Name = "GetFile")]
        public IActionResult GetFile(int id)
        {
            return Get(_service.GetFile, id);
        }

        /**
         *  POST: api/files
         *  OLD: GetWordDoc, GetPdf
         */
        [HttpPost]
        public IActionResult AddFile([FromBody]FileModel value)
        {
            return Post(_service.AddFile, value, "GetFile");
        }

        /**
         *  PUT: api/files/5
         */
        [HttpPut("{id}")]
        public IActionResult UpdateFile(int id, [FromBody]FileModel value)
        {
            return Put(_service.UpdateFile, value);
        }

        /**
         *  DELETE: api/files/5
         */
        [HttpDelete("{id}")]
        public IActionResult DeleteFile(int id)
        {
            return Delete(_service.DeleteFile, id);
        }
    }
}
