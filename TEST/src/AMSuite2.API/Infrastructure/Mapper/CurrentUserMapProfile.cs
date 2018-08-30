using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AMSuite2.API.Features.Core.Users;
using AMSuite2.API.Infrastructure.Models;
using AMSuite2.Entities.DataClasses;
using AMSuite2.Entities.Identity;
using AutoMapper;

namespace AMSuite2.API.Infrastructure.Mapper
{
    public class CurrentUserMapProfile : Profile
    {
        public CurrentUserMapProfile()
        {
            CreateMap<ApplicationUser, CurrentUserModel>()
                .IncludeBase<ApplicationUser, UserModel>();

            CreateMap<CurrentUserModel, ApplicationUser>()
                .IncludeBase<UserModel, ApplicationUser>();
        }
    }
}
