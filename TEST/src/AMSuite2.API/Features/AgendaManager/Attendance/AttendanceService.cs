using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;
using AMSuite2.API.Features.AgendaManager.Agendas;

namespace AMSuite2.API.Features.AgendaManager.Attendance
{
    public interface IAttendanceService
    {
        IEnumerable<AttendanceModel> GetAgendaAttendance(int agendaId);
        void DeleteAgendaAttendance(int agendaId);
        IEnumerable<AttendanceModel> SaveAgendaAttendance(int agendaId, IEnumerable<AttendanceModel> model);
    }

    public class AttendanceService : IAttendanceService
    {
        private readonly IAttendanceRepository _repo;
        private readonly IAgendasService _agendas;

        public AttendanceService(IAttendanceRepository repo, IAgendasService agendas)
        {
            _repo = repo;
            _agendas = agendas;
        }

        public IEnumerable<AttendanceModel> GetAgendaAttendance(int agendaId)
        {
            var attendance = _repo.FindByAgenda(agendaId);
            return attendance.OrderByDescending(x => x.CreatedDate);
        }

        public IEnumerable<AttendanceModel> SaveAgendaAttendance(int agendaId, IEnumerable<AttendanceModel> model)
        {
            var agenda = _agendas.GetAgenda(agendaId);
            agenda.RollcallTaken = true;
            _agendas.UpdateAgenda(agenda);

            DeleteAgendaAttendance(agendaId);
            _repo.Insert(model);
            return GetAgendaAttendance(agendaId);
        }

        public void DeleteAgendaAttendance(int agendaId)
        {
            var votes = GetAgendaAttendance(agendaId);
            var ids = votes.Select(x => x.Id);
            _repo.Delete(ids);
        }
    }
}
