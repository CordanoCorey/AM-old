using AMSuite2.API.Features.Core.Announcements;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AMSuite2.API.Features.Core.Dashboard
{
    public partial class DashboardModel
    {
        public IEnumerable<AnnouncementModel> Announcements { get; set; }
    }
}
