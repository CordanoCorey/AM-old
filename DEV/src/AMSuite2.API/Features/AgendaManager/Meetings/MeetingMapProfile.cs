using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AMSuite2.API.Features.AgendaManager.Meetings;
using AMSuite2.Entities.DataClasses;
using AutoMapper;

namespace AMSuite2.API.Infrastructure.Mapper
{
    public class MeetingMapProfile : Profile
    {
        public MeetingMapProfile()
        {
            CreateMap<Meeting, MeetingModel>()
                .ForMember(d => d.Date, o => o.MapFrom(s => s.MeetingDate))
                .ForMember(d => d.Location, o => o.MapFrom(s => s.MeetingLocation))
                .ForMember(d => d.Name, o => o.MapFrom(s => s.MeetingName))
                .ForMember(d => d.TypeId, o => o.MapFrom(s => s.MeetingTypeId))
                .ForMember(d => d.GroupName, o => o.MapFrom(s => s.Group.GroupName))
                .ForMember(d => d.SecurityStatusId, o => o.MapFrom(s => s.StatusId))
                .ForMember(d => d.Agendas, o => o.Ignore());

            CreateMap<MeetingModel, Meeting>()
                .ForMember(d => d.MeetingDate, o => o.MapFrom(s => s.Date))
                .ForMember(d => d.MeetingLocation, o => o.MapFrom(s => s.Location))
                .ForMember(d => d.MeetingName, o => o.MapFrom(s => s.Name))
                .ForMember(d => d.MeetingTypeId, o => o.MapFrom(s => s.TypeId))
                .ForMember(d => d.StatusId, o => o.MapFrom(s => s.SecurityStatusId));
        }
    }
}
