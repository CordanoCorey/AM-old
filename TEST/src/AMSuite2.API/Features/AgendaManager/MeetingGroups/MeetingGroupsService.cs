using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AMSuite2.API.Features.Core.Groups;

namespace AMSuite2.API.Features.AgendaManager.MeetingGroups
{
    public interface IMeetingGroupsService
    {
        MeetingGroupsModel GetMeetingGroups(int meetingId);
    }

    public class MeetingGroupsService : IMeetingGroupsService
    {
        private readonly IGroupsRepository _repo;

        public MeetingGroupsService(IGroupsRepository repo)
        {
            _repo = repo;
        }

        public MeetingGroupsModel GetMeetingGroups(int meetingId)
        {
            throw new NotImplementedException();
        }
    }
}
