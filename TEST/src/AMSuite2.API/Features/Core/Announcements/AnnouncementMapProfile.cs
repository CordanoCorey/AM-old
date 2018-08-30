using System;
using System.Collections.Generic;
using System.Linq;
using AMSuite2.API.Features.Core.Announcements;
using AMSuite2.Entities.DataClasses;
using AutoMapper;

namespace AMSuite2.API.Infrastructure.Mapper
{
    public class AnnouncementMapProfile : Profile
    {
        public AnnouncementMapProfile()
        {
            CreateMap<Announcement, AnnouncementModel>()
                .ForMember(d => d.Description, o => o.MapFrom(s => s.Announcement1))
                .ForMember(d => d.LastModifiedDate, o => o.MapFrom(s => s.LastModifiedOn))
                .ForMember(d => d.AnnouncementTypeName, o => o.MapFrom(s => s.AnnouncementType.Name));

            CreateMap<AnnouncementModel, Announcement>()
                .ForMember(d => d.Announcement1, o => o.MapFrom(s => s.Description))
                .ForMember(d => d.LastModifiedOn, o => o.MapFrom(s => s.LastModifiedDate));
        }
    }
}
