using AMSuite2.API.Infrastructure.Models;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace AMSuite2.API.Features.AgendaManager.Meetings
{
    public interface IMeetingsService
    {
        IEnumerable<MeetingModel> GetMeetings(MeetingsQueryModel query);
        IEnumerable<MeetingModel> GetMeetingsByAccount(MeetingsQueryModel query);
        IEnumerable<MeetingModel> GetMeetingsByGroup(MeetingsQueryModel query);
        IEnumerable<MeetingModel> GetDeletedMeetings(int accountId);
        MeetingModel GetMeeting(int id);
        MeetingModel GetMeetingCalendar(int id);
        MeetingModel AddMeeting(MeetingModel meeting);
        MeetingModel UpdateMeeting(MeetingModel meeting);
        void DeleteMeeting(int id);
        IEnumerable<MeetingModel> GetDashboardMeetings(int userId);
    }
    public class MeetingsService : IMeetingsService
    {
        private readonly IMeetingsRepository _repo ;

        public MeetingsService(IMeetingsRepository repo)
        {
            _repo = repo;
        }

        public MeetingModel AddMeeting(MeetingModel model)
        {
            return _repo.Insert(model);
        }

        public void DeleteMeeting(int id)
        {
            _repo.Delete(id);
        }

        public IEnumerable<MeetingModel> GetDashboardMeetings(int userId)
        {
            return _repo.FindBy(x => x.CreatedBy == userId);
        }

        public IEnumerable<MeetingModel> GetDeletedMeetings(int accountId)
        {
            return _repo.FindDeletedMeetings(accountId);
        }

        public MeetingModel GetMeeting(int id)
        {
            return _repo.FindByKey(id);
        }

        public MeetingModel GetMeetingCalendar(int id)
        {
            throw new NotImplementedException();
        }
        
        public IEnumerable<MeetingModel> GetMeetings(MeetingsQueryModel query)
        {
            return query.GroupId == 0 ? GetMeetingsByAccount(query) : GetMeetingsByGroup(query);
        }

        public IEnumerable<MeetingModel> GetMeetingsByAccount(MeetingsQueryModel query)
        {
            return query.IsNullOrDefault ? _repo.FindByAccount(query.AccountId, query.StartDate, query.EndDate) 
                : _repo.FindByAccount(query.AccountId, query.StartDate, query.EndDate, query);
        }

        public IEnumerable<MeetingModel> GetMeetingsByGroup(MeetingsQueryModel query)
        {
            return query.IsNullOrDefault ? _repo.FindByGroup(query.GroupId, query.StartDate, query.EndDate) 
                : _repo.FindByGroup(query.GroupId, query.StartDate, query.EndDate, query);
        }

        public MeetingModel UpdateMeeting(MeetingModel meeting)
        {
            return _repo.Update(meeting);
        }
    }
}
