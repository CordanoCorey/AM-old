using System;
using System.Collections.Generic;
using System.Linq;
using AMSuite2.API.Features.Core.Dashboard;
using AMSuite2.Entities.DataClasses;
using AutoMapper;

namespace AMSuite2.API.Infrastructure.Mapper
{
    public class DashboardMapProfile : Profile
    {
        public DashboardMapProfile()
        {
            CreateMap<SysAdminAnnouncement, DashboardMessageModel>()
                .ForMember(d => d.Description, o => o.MapFrom(s => s.Announcement));

            CreateMap<DashboardMessageModel, SysAdminAnnouncement>()
                .ForMember(d => d.Announcement, o => o.MapFrom(s => s.Description));
        }
    }
}
