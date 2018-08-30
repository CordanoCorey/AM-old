using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AMSuite2.API.Features.Core.AccountLogo;
using AMSuite2.Entities.DataClasses;
using AutoMapper;

namespace AMSuite2.API.Infrastructure.Mapper
{
    public class AccountLogoMapProfile : Profile
    {
        public AccountLogoMapProfile()
        {
            CreateMap<AccountLogoModel, AccountLogo>()
                .ForMember(d => d.CreatedOn, o => o.MapFrom(s => s.CreatedDate));

            CreateMap<AccountLogo, AccountLogoModel>()
                .ForMember(d => d.CreatedDate, o => o.MapFrom(s => s.CreatedOn));
        }
    }
}
