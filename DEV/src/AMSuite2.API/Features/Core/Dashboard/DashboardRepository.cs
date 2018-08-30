using AMSuite2.API.Infrastructure.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AMSuite2.Entities.Context;
using AMSuite2.Entities.DataClasses;
using AutoMapper;

namespace AMSuite2.API.Features.Core.Dashboard
{
    public interface IDashboardRepository : IBaseRepository<SysAdminAnnouncement, DashboardMessageModel>
    {

    }

    public class DashboardRepository : BaseRepository<SysAdminAnnouncement, DashboardMessageModel>, IDashboardRepository
    {
        public DashboardRepository(AMSuiteContext context, IMapper mapper) : base(context, mapper)
        {
        }
    }
}
