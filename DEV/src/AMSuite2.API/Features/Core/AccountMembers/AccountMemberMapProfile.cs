using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using AMSuite2.API.Features.Core.AccountMembers;
using AMSuite2.Entities.DataClasses;

namespace AMSuite2.API.Infrastructure.Mapper
{
    public class AccountMemberMapProfile : Profile
    {
        public AccountMemberMapProfile()
        {
            CreateMap<AccountUserRoleXref, AccountMemberModel>()
                .ForMember(d => d.User, o => o.MapFrom(s => s.User))
                .ForMember(d => d.AccountRoleId, o => o.MapFrom(s => s.RoleId))
                .ForMember(d => d.AccountRole, o => o.MapFrom(s => s.Role.Name))
                .ForMember(d => d.IsPrimaryAccount, o => o.MapFrom(s => s.PrimaryAccount));

            CreateMap<AccountMemberModel, AccountUserRoleXref>()
                .ForMember(d => d.Account, opt => opt.Ignore())
                .ForMember(d => d.PrimaryAccount, o => o.MapFrom(s => s.IsPrimaryAccount))
                .ForMember(d => d.RoleId, o => o.MapFrom(s => s.AccountRoleId))
                .ForMember(d => d.User, opt => opt.Ignore());
        }
    }
}
