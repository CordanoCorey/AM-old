using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AMSuite2.API.Infrastructure.Controllers;
using Microsoft.AspNetCore.Mvc;
using AMSuite2.API.Infrastructure.Models;
using Microsoft.AspNetCore.Authorization;

namespace AMSuite2.API.Features.AgendaManager.Meetings
{
    [Route("api/meetings")]
    //[Authorize(Policy = "Account")]
    public class MeetingsController : BaseController
    {
        private readonly IMeetingsService _service;

        public MeetingsController(IMeetingsService service)
        {
            _service = service;
        }

        /**
         *  GET: api/meetings
         *  OLD: GetMeetingList, GetJustMeetingList 
         */
        [HttpGet]
        public IActionResult GetMeetings(MeetingsQueryModel query)
        {
            var result = _service.GetMeetings(query);
            return Ok(result);
        }

        /**
         *  GET: api/meetings/5
         *  OLD: GetMeetingId, GetMeeting
         */
        [HttpGet("{id}", Name = "GetMeeting")]
        public IActionResult GetMeeting(int id)
        {
            return Get(_service.GetMeeting, id);
        }

        /**
         *  POST: api/meeting
         *  OLD: MeetingEdit
         */
        [HttpPost]
        public IActionResult AddMeeting([FromBody]MeetingModel model)
        {
            return Post(_service.AddMeeting, Audit(model), "GetMeeting");
        }

        /**
         *  PUT: api/meetings/5
         *  OLD: MeetingEdit, MarkMeetingForDelete?
         */
        [HttpPut("{id}")]
        public IActionResult UpdateMeeting(int id, [FromBody]MeetingModel model)
        {
            return Put(_service.UpdateMeeting, AuditExisting(model));
        }

        /**
         *  DELETE: api/meetings/5
         *  OLD: MarkMeetingForDelete
         */
        [HttpDelete("{id}")]
        public IActionResult DeleteMeeting(int id)
        {
            return Delete(_service.DeleteMeeting, id);
        }

        /**
         *  GET: api/meetings/deleted
         *  OLD: GetDeletedMeetings
         */
        [HttpGet("~/api/accounts/{accountId}/meetings/deleted")]
        public IActionResult GetDeletedMeetings(int accountId)
        {
            return Get(_service.GetDeletedMeetings, accountId);
        }

        /**
         *  GET: api/meetings/5/calendar
         *  OLD: DownloadCalendarMeeting
         */
        [HttpGet("{id}/calendar")]
        public IActionResult GetMeetingCalendar(int id)
        {
            return Get(_service.GetMeetingCalendar, id);
        }

        /**
         *  GET: api/dashboard
         *  OLD: GetDashboardAgenda, GetMeetingList
         */
        [HttpGet("~/api/dashboard/{userId}/meetings")]
        public IActionResult GetDashboardMeetings()
        {
            return Get(_service.GetDashboardMeetings, UserId);
        }
    }
}
