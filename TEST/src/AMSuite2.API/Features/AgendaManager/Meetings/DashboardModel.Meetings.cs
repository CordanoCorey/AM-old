using AMSuite2.API.Features.AgendaManager.Meetings;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AMSuite2.API.Features.Core.Dashboard
{
    public partial class DashboardModel
    {
        public IEnumerable<MeetingModel> Meetings { get; set; }
    }
}
