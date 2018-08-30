using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using AMSuite2.API.Infrastructure.Controllers;

namespace AMSuite2.API.Features.AgendaManager.Attendance
{
    [Route("api/attendance")]
    public class AttendanceController : BaseController
    {
        private readonly IAttendanceService _service;

        public AttendanceController(IAttendanceService service)
        {
            _service = service;
        }

        /**
         *  DELETE: api/agendas/5/attendance
         */
        [HttpDelete("~/api/agendas/{agendaId}/attendance")]
        public IActionResult DeleteAgendaAttendance(int agendaId)
        {
            return Delete(_service.DeleteAgendaAttendance, agendaId);
        }

        /**
         *  GET: api/agendas/5/attendance
         *  OLD: GetAgendaAttendance, GetAgendaLatestAttendance, GetAgendaAttendanceLog
         */
        [HttpGet("~/api/agendas/{agendaId}/attendance", Name="GetAttendance")]
        public IActionResult GetAgendaAttendance(int agendaId)
        {
            return Get(_service.GetAgendaAttendance, agendaId);
        }

        /**
         *  POST: api/agendas/5/attendance
         *  OLD: TakeRollCall, AddAttendance
         */
        [HttpPost("~/api/agendas/{agendaId}/attendance")]
        public IActionResult SaveAgendaAttendance(int agendaId, [FromBody]IEnumerable<AttendanceModel> model)
        {
            var attendance = model.Select(x => Audit(x));
            return Post(_service.SaveAgendaAttendance, agendaId, attendance, "GetAttendance");
        }
    }
}
