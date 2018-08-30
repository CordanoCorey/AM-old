using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AMSuite2.API.Infrastructure.Models;

namespace AMSuite2.API.Features.Core.Dashboard
{
    public class DashboardMessageModel : BaseEntity
    {
        public string Description { get; set; }
        public DateTime? EndDate { get; set; }
        public char Lock { get; set; }
        public DateTime? StartDate { get; set; }
        public string Subject { get; set; }
    }
}
