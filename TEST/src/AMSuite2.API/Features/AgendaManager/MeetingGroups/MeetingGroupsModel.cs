using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AMSuite2.API.Features.Core.Groups;

namespace AMSuite2.API.Features.AgendaManager.MeetingGroups
{
    public class MeetingGroupsModel
    {
        public int MeetingId { get; set; }
        public IEnumerable<GroupModel> Groups { get; set; }
    }
}
