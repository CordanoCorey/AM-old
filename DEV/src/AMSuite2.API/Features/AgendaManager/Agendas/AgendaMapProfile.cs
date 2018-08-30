using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AMSuite2.API.Features.AgendaManager.Agendas;
using AMSuite2.Entities.DataClasses;
using AutoMapper;

namespace AMSuite2.API.Infrastructure.Mapper
{
    public class AgendaMapProfile : Profile
    {
        public AgendaMapProfile()
        {
            CreateMap<Agenda, AgendaModel>()
                .ForMember(d => d.Description, o => o.MapFrom(s => s.AgendaDescription))
                .ForMember(d => d.Name, o => o.MapFrom(s => s.AgendaName))
                .ForMember(d => d.SecurityStatusName, o => o.MapFrom(s => s.Status.Name))
                .ForMember(d => d.SecurityStatusId, o => o.MapFrom(s => s.StatusId))
                .ForMember(d => d.GroupName, o => o.MapFrom(s => s.Group.GroupName))
                .ForMember(d => d.TimeframeDescription, o => o.MapFrom(s => s.TimeFrame.TimeFrameDescription));

            CreateMap<AgendaModel, Agenda>()
                .ForMember(d => d.AgendaDescription, o => o.MapFrom(s => s.Description))
                .ForMember(d => d.AgendaName, o => o.MapFrom(s => s.Name))
                .ForMember(d => d.StatusId, o => o.MapFrom(s => s.SecurityStatusId));
        }
    }
}
