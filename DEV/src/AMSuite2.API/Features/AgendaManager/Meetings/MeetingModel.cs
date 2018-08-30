using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AMSuite2.API.Features.AgendaManager.Agendas;
using AMSuite2.API.Features.Core.Accounts;
using AMSuite2.API.Features.Core.Email;
using AMSuite2.API.Features.Core.GroupMembers;
using AMSuite2.API.Infrastructure.Models;

namespace AMSuite2.API.Features.AgendaManager.Meetings
{
    public class MeetingModel : BaseEntity, IEntity
    {
        public int Id { get; set; }
        public int AccountId { get; set; }
        public int? AttendanceTakerId { get; set; }
        public string Comments { get; set; }
        public int? ConferenceId { get; set; }
        public DateTime Date { get; set; }
        public TimeSpan? EndTime { get; set; }
        public int? GroupId { get; set; }
        public string Location { get; set; }
        public DateTime? MarkedForDelete { get; set; }
        public int? MinuteTakerId { get; set; }
        public string Name { get; set; }
        public int? OutlineId { get; set; }
        public TimeSpan? StartTime { get; set; }
        public int SecurityStatusId { get; set; }
        public int? TypeId { get; set; }
        public int? VoteTakerId { get; set; }

        public AccountModel Account { get; set; }
        public string AccountName { get; set; }
        public IEnumerable<AgendaModel> Agendas { get; set; }
        public IEnumerable<EmailModel> Email { get; set; }
        public IEnumerable<GroupMemberModel> GroupMembers { get; set; }
        public string GroupName { get; set; }
        public string SecurityStatusName { get; set; }
    }

    public class MeetingFiltersModel
    {
        public DateTime StartDate { get; set; } = DateTime.Today.AddDays(-100);
        public DateTime EndDate { get; set; } = DateTime.Today.AddDays(100);
        public int TakeNumber { get; set; } = 200;
        public int GroupId { get; set; } = 0;
        public int UserId { get; set; } = 38;
        public int AccountId { get; set; } = 4;
    }

    public class MeetingsQueryModel : QueryModel<MeetingModel>
    {
        public DateTime StartDate { get; set; } = DateTime.Today.AddDays(-100);
        public DateTime EndDate { get; set; } = DateTime.Today.AddDays(100);
        public int GroupId { get; set; } = 0;
    }
}
