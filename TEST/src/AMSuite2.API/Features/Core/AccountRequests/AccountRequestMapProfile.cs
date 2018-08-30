using System;
using System.Collections.Generic;
using System.Linq;
using AMSuite2.API.Features.Core.AccountRequests;
using AMSuite2.Entities.DataClasses;
using AutoMapper;

namespace AMSuite2.API.Infrastructure.Mapper
{
    public class AccountRequestMapProfile : Profile
    {
        public AccountRequestMapProfile()
        {
            CreateMap<NotificationAccountRequestXref, AccountRequestModel>()
                .ForMember(d => d.Account, opt => opt.Ignore())
                .ForMember(d => d.AccountId, opt => opt.Ignore())
                .ForMember(d => d.AccountName, opt => opt.Ignore())
                .ForMember(d => d.NotificationStatus, opt => opt.Ignore())
                .ForMember(d => d.NotificationStatusId, o => o.MapFrom(s => s.Notification.StatusId))
                .ForMember(d => d.NotificationType, opt => opt.Ignore())
                .ForMember(d => d.NotificationTypeId, o => o.MapFrom(s => s.Notification.TypeId))
                .ForMember(d => d.Reason, opt => opt.Ignore())
                .ForMember(d => d.UserName, o => o.MapFrom(s => s.User.UserName));

            CreateMap<AccountRequestModel, NotificationAccountRequestXref>();
        }
    }
}
