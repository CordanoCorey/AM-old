using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AMSuite2.API.Features.AgendaManager.AgendaItems;
using AMSuite2.API.Features.AgendaManager.Agendas;
using AMSuite2.API.Features.AgendaManager.Meetings;
using AMSuite2.API.Features.Core.Users;
using AMSuite2.API.Infrastructure.Models;

namespace AMSuite2.API.Features.AgendaManager.Attendance
{
    public class AttendanceModel : BaseEntity, IEntity
    {
        public int Id { get; set; }
        public int AgendaId { get; set; }
        public int? AgendaItemId { get; set; }
        public bool? IsPresent { get; set; }
        public int MeetingId { get; set; }
        public int TypeId { get; set; }
        public int? UserId { get; set; }
        public string WriteInAttendees { get; set; }

        public AgendaItemModel AgendaItem { get; set; }
        public AgendaModel Agenda { get; set; }
        public MeetingModel Meeting { get; set; }
        public string TypeName { get; set; }
        public UserModel User { get; set; }
    }
}
