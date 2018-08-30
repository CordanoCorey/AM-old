using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AMSuite2.API.Features.Core.Users;
using AMSuite2.Entities.DataClasses;
using AMSuite2.Entities.Identity;
using AutoMapper;

namespace AMSuite2.API.Infrastructure.Mapper
{
    public class UserMapProfile : Profile
    {
        public UserMapProfile()
        {
            CreateMap<ApplicationUser, UserModel>()
                .ForMember(d => d.EmailAddress, o => o.MapFrom(s => s.Email));
                //.ForMember(d => d.UserGroups, o => o.MapFrom(s => s.GroupMembershipXref));

            CreateMap<UserModel, ApplicationUser>()
                .ForMember(d => d.Email, o => o.MapFrom(s => s.EmailAddress));
                //.ForMember(d => d.GroupMembershipXref, o => o.MapFrom(s => s.UserGroups));
        }
    }
}
