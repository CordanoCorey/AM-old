using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AMSuite2.API.Features.AgendaManager.AgendaItems;
using AMSuite2.Entities.DataClasses;
using AutoMapper;

namespace AMSuite2.API.Infrastructure.Mapper
{
    public class AgendaItemMapProfile : Profile
    {
        public AgendaItemMapProfile()
        {
            CreateMap<AgendaItemData, AgendaItemModel>()
                .ForMember(d => d.Description, o => o.MapFrom(s => s.AgendaItemDescription))
                .ForMember(d => d.Name, o => o.MapFrom(s => s.AgendaItemName))
                .ForMember(d => d.Order, o => o.MapFrom(s => s.DisplayOrder))
                .ForMember(d => d.ParentId, o => o.MapFrom(s => s.ParentItemId))
                .ForMember(d => d.SecurityStatusId, o => o.MapFrom(s => s.StatusId))
                .ForMember(d => d.SecurityStatusName, o => o.MapFrom(s => s.Status.Name))
                .ForMember(d => d.IsSuggestion, o => o.MapFrom(s => s.Suggestion));

            CreateMap<AgendaItemModel, AgendaItemData>()
                .ForMember(d => d.AgendaItemDescription, o => o.MapFrom(s => s.Description))
                .ForMember(d => d.AgendaItemName, o => o.MapFrom(s => s.Name))
                .ForMember(d => d.ParentItemId, o => o.MapFrom(s => s.ParentId))
                .ForMember(d => d.StatusId, o => o.MapFrom(s => s.SecurityStatusId))
                .ForMember(d => d.Suggestion, o => o.MapFrom(s => s.IsSuggestion));
        }
    }
}
