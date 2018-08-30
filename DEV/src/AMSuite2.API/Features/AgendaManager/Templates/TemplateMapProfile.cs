using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AMSuite2.API.Features.AgendaManager.Templates;
using AMSuite2.Entities.DataClasses;
using AutoMapper;

namespace AMSuite2.API.Infrastructure.Mapper
{
    public class TemplateMapProfile : Profile
    {
        public TemplateMapProfile()
        {
            CreateMap<Template, TemplateModel>()
                .ForMember(d => d.Description, o => o.MapFrom(s => s.TemplateDescription))
                .ForMember(d => d.Name, o => o.MapFrom(s => s.TemplateName))
                .ForMember(d => d.TypeId, o => o.MapFrom(s => s.TemplateTypeId))
                .ForMember(d => d.LastModifiedBy, o => o.MapFrom(s => s.UpdatedBy))
                .ForMember(d => d.LastModifiedDate, o => o.MapFrom(s => s.UpdatedDate));

            CreateMap<TemplateModel, Template>()
                .ForMember(d => d.TemplateDescription, o => o.MapFrom(s => s.Description))
                .ForMember(d => d.TemplateName, o => o.MapFrom(s => s.Name))
                .ForMember(d => d.TemplateTypeId, o => o.MapFrom(s => s.TypeId))
                .ForMember(d => d.UpdatedBy, o => o.MapFrom(s => s.LastModifiedBy))
                .ForMember(d => d.UpdatedDate, o => o.MapFrom(s => s.LastModifiedDate));
        }
    }
}
