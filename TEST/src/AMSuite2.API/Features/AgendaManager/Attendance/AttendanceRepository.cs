using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AMSuite2.API.Infrastructure.Repositories;
using AMSuite2.Entities.Context;
using AMSuite2.Entities.DataClasses;
using AutoMapper;

namespace AMSuite2.API.Features.AgendaManager.Attendance
{
    public interface IAttendanceRepository : IBaseRepository<Entities.DataClasses.Attendance, AttendanceModel>
    {
        IEnumerable<AttendanceModel> FindByAgenda(int agendaId);
    }

    public class AttendanceRepository : BaseRepository<Entities.DataClasses.Attendance, AttendanceModel>, IAttendanceRepository
    {
        public AttendanceRepository(AMSuiteContext context, IMapper mapper) : base(context, mapper)
        {
        }

        public IEnumerable<AttendanceModel> FindByAgenda(int agendaId)
        {
            return FindBy(x => x.AgendaId == agendaId);
        }
    }
}
