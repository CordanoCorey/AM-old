using AMSuite2.API.Infrastructure.Lookup;
using AMSuite2.Entities.DataClasses;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AMSuite2.API.Infrastructure.Mapper
{
    public class LookupMapProfile : Profile
    {
        public LookupMapProfile()
        {
            CreateMap<AccountStatusLkp, LookupValueModel>()
                .ForMember(d => d.Description, o => o.MapFrom(s => s.Name));

            CreateMap<AgendaLkp, LookupValueModel>()
                .ForMember(d => d.Description, o => o.MapFrom(s => s.AgendaDescription));

            CreateMap<AgendaDateRangeLkp, LookupValueModel>()
                .ForMember(d => d.Description, o => o.MapFrom(s => s.Name))
                .ForMember(d => d.Active, o => o.MapFrom(s => s.UserProfileDisplay));

            CreateMap<NotificationStatusLkp, LookupValueModel>()
                .ForMember(d => d.Name, o => o.MapFrom(s => s.Status))
                .ForMember(d => d.Description, o => o.MapFrom(s => s.Status));

            CreateMap<NotificationTypeLkp, LookupValueModel>()
                .ForMember(d => d.Name, o => o.MapFrom(s => s.Type))
                .ForMember(d => d.Description, o => o.MapFrom(s => s.Type));

            CreateMap<GroupRoleLkp, LookupValueModel>()
                .ForMember(d => d.Description, o => o.MapFrom(s => s.EnumCode));

            CreateMap<OutlineLkp, LookupValueModel>()
                .ForMember(d => d.Description, o => o.MapFrom(s => s.EnumCode));

            CreateMap<RoleLkp, LookupValueModel>();

            CreateMap<VoteAnswerLkp, LookupValueModel>()
                .ForMember(d => d.Description, o => o.MapFrom(s => s.Name))
                .ForMember(d => d.Active, o => o.MapFrom(s => s.IsActive));
        }
    }
}
