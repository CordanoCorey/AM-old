using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using AMSuite2.API.Infrastructure.Controllers;
using System.IO;
using Microsoft.Extensions.PlatformAbstractions;
using Newtonsoft.Json;
using AMSuite2.API.Infrastructure.Services;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace AMSuite2.API.Infrastructure.Lookup
{
    [Route("api/lookup")]
    public class LookupController : BaseController
    {
        private ILookupService _service;
        private IFileReader _fileReader;

        public LookupController(ILookupService service, IFileReader fileReader)
        {
            _service = service;
            _fileReader = fileReader;
        }

        /**
         *  GET: api/lookup
         *  Get all lookup data
         */
        [HttpGet]
        public IActionResult GetAllLookups([FromQuery] IEnumerable<string> keys)
        {
            return Ok(_service.GetLookupTables(keys));
        }

        /**
         *  GET: api/Lookup/AccountStatuses
         */
        [HttpGet("AccountStatuses")]
        public IActionResult GetAccountStatuses()
        {
            return Ok(_service.GetLookupTable("AccountStatuses"));
        }

        /**
         *  GET: api/Lookup/DateRanges
         *  OLD: DateRanges
         */
        [HttpGet("DateRanges")]
        public IActionResult GetDateRanges()
        {
            return Ok(_service.GetLookupTable("DateRanges"));
        }

        /**
         *  GET: api/Lookup/GroupRoles
         */
        [HttpGet("GroupRoles")]
        public IActionResult GetGroupRoles()
        {
            return Ok(_service.GetLookupTable("GroupRoles"));
        }

        /**
         *  GET: api/Lookup/NotificationStatuses
         */
        [HttpGet("NotificationStatuses")]
        public IActionResult GetNotificationStatuses()
        {
            return Ok(_service.GetLookupTable("NotificationStatuses"));
        }

        /**
         *  GET: api/Lookup/NotificationTypes
         */
        [HttpGet("NotificationTypes")]
        public IActionResult GetNotificationTypes()
        {
            return Ok(_service.GetLookupTable("NotificationTypes"));
        }

        /**
         *  GET: api/Lookup/Outlines
         */
        [HttpGet("Outlines")]
        public IActionResult GetOutlines()
        {
            return Ok(_service.GetLookupTable("Outlines"));
        }

        /**
         *  GET: api/Lookup/UserRoles
         *  OLD: UserRoles
         */
        [HttpGet("UserRoles")]
        public IActionResult GetUserRoles()
        {
            return Ok(_service.GetLookupTable("UserRoles"));
        }

        /**
         *  GET: api/Lookup/VoteAnswers
         */
        [HttpGet("VoteAnswers")]
        public IActionResult GetVoteAnswers()
        {
            return Ok(_service.GetLookupTable("VoteAnswers"));
        }

        /**
         *  GET: api/Lookup/AppJson
         */
        [HttpGet("AppJson")]
        public IActionResult GetAppJson()
        {
            return Ok(_fileReader.ReadJson<object>(_fileReader.GetPath("app.json")));
        }
    }
}
