using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AMSuite2.API.Features.Core.Profile;
using AMSuite2.API.Features.Core.Users;
using AMSuite2.API.Infrastructure.Models;
using AMSuite2.Entities.DataClasses;
using AMSuite2.Entities.Identity;
using AutoMapper;

namespace AMSuite2.API.Infrastructure.Mapper
{
    public class ProfileMapProfile : Profile
    {
        public ProfileMapProfile()
        {
            CreateMap<ProfileModel, CurrentUserModel>()
                .ForMember(d => d.Id, o => o.MapFrom(s => s.UserId))
                .ForMember(d => d.AccessFailedCount, o => o.MapFrom(s => s.User.AccessFailedCount))
                .ForMember(d => d.AgendaDateRangeId, o => o.MapFrom(s => s.User.AgendaDateRangeId))
                .ForMember(d => d.AutoSaveEnabled, o => o.MapFrom(s => s.User.AutoSaveEnabled))
                .ForMember(d => d.ConcurrencyStamp, o => o.MapFrom(s => s.User.ConcurrencyStamp))
                .ForMember(d => d.CreatedBy, o => o.MapFrom(s => s.User.CreatedBy))
                .ForMember(d => d.CreatedDate, o => o.MapFrom(s => s.User.CreatedDate))
                .ForMember(d => d.DefaultGroupId, o => o.MapFrom(s => s.User.DefaultGroupId))
                .ForMember(d => d.EmailConfirmed, o => o.MapFrom(s => s.User.EmailConfirmed))
                .ForMember(d => d.FailedPasswordAttemptCount, o => o.MapFrom(s => s.User.FailedPasswordAttemptCount))
                .ForMember(d => d.FullName, o => o.MapFrom(s => s.User.FullName))
                .ForMember(d => d.IsActive, o => o.MapFrom(s => s.User.IsActive))
                .ForMember(d => d.IsLockedOut, o => o.MapFrom(s => s.User.IsLockedOut))
                .ForMember(d => d.LastLockoutDate, o => o.MapFrom(s => s.User.LastLockoutDate))
                .ForMember(d => d.LastLoginDate, o => o.MapFrom(s => s.User.LastLoginDate))
                .ForMember(d => d.LastModifiedBy, o => o.MapFrom(s => s.User.LastModifiedBy))
                .ForMember(d => d.LastModifiedDate, o => o.MapFrom(s => s.User.LastModifiedDate))
                .ForMember(d => d.LastPasswordChangedDate, o => o.MapFrom(s => s.User.LastPasswordChangedDate))
                .ForMember(d => d.LockoutEnabled, o => o.MapFrom(s => s.User.LockoutEnabled))
                .ForMember(d => d.LockoutEnd, o => o.MapFrom(s => s.User.LockoutEnd))
                .ForMember(d => d.MiddleName, o => o.MapFrom(s => s.User.MiddleName))
                .ForMember(d => d.NormalizedEmail, o => o.MapFrom(s => s.User.NormalizedEmail))
                .ForMember(d => d.NormalizedUserName, o => o.MapFrom(s => s.User.NormalizedUserName))
                .ForMember(d => d.PasswordHash, o => o.MapFrom(s => s.User.PasswordHash))
                .ForMember(d => d.PasswordResetCode, o => o.MapFrom(s => s.User.PasswordResetCode))
                .ForMember(d => d.PhoneNumber, o => o.MapFrom(s => s.User.PhoneNumber))
                .ForMember(d => d.PhoneNumberConfirmed, o => o.MapFrom(s => s.User.PhoneNumberConfirmed))
                .ForMember(d => d.SecurityStamp, o => o.MapFrom(s => s.User.SecurityStamp))
                .ForMember(d => d.ServerSalt, o => o.MapFrom(s => s.User.ServerSalt))
                .ForMember(d => d.TwoFactorEnabled, o => o.MapFrom(s => s.User.TwoFactorEnabled))
                .ForMember(d => d.UserName, o => o.MapFrom(s => s.User.UserName));

            CreateMap<CurrentUserModel, ProfileModel>()
                .ForMember(d => d.UserId, o => o.MapFrom(s => s.Id))
                .ForMember(d => d.User, o => o.MapFrom(s => s));
        }
    }
}
