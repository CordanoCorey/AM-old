using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AMSuite2.API.Features.AgendaManager.TemplateItems;
using AMSuite2.Entities.DataClasses;
using AutoMapper;

namespace AMSuite2.API.Infrastructure.Mapper
{
    public class TemplateItemMapProfile : Profile
    {
        public TemplateItemMapProfile()
        {
            CreateMap<TemplateItem, TemplateItemModel>()
                .ForMember(d => d.Date, o => o.MapFrom(s => s.TemplateItemDate))
                .ForMember(d => d.Description, o => o.MapFrom(s => s.TemplateItemDescription))
                .ForMember(d => d.Name, o => o.MapFrom(s => s.TemplateItemName))
                .ForMember(d => d.Order, o => o.MapFrom(s => s.DisplayOrder))
                .ForMember(d => d.ParentId, o => o.MapFrom(s => s.ParentItemId))
                .ForMember(d => d.LastModifiedBy, o => o.MapFrom(s => s.UpdatedBy))
                .ForMember(d => d.LastModifiedDate, o => o.MapFrom(s => s.UpdatedDate));

            CreateMap<TemplateItemModel, TemplateItem>()
                .ForMember(d => d.TemplateItemDate, o => o.MapFrom(s => s.Date))
                .ForMember(d => d.TemplateItemDescription, o => o.MapFrom(s => s.Description))
                .ForMember(d => d.TemplateItemName, o => o.MapFrom(s => s.Name))
                .ForMember(d => d.DisplayOrder, o => o.MapFrom(s => s.Order))
                .ForMember(d => d.ParentItemId, o => o.MapFrom(s => s.ParentId))
                .ForMember(d => d.UpdatedBy, o => o.MapFrom(s => s.LastModifiedBy))
                .ForMember(d => d.UpdatedDate, o => o.MapFrom(s => s.LastModifiedDate));
        }
    }
}
