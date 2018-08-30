using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AMSuite2.API.Features.Core.Groups;
using AMSuite2.API.Features.Core.Notifications;
using AMSuite2.Entities.DataClasses;
using AutoMapper;

namespace AMSuite2.API.Infrastructure.Mapper
{
    public class NotificationMapProfile : Profile
    {
        public NotificationMapProfile()
        {
            CreateMap<Notification, NotificationModel>()
                .ForMember(d => d.Group, opt => opt.Ignore())
                .ForMember(d => d.LastModifiedBy, opt => opt.Ignore())
                .ForMember(d => d.LastModifiedDate, opt => opt.Ignore())
                .ForMember(d => d.LinkedNotification, opt => opt.Ignore())
                .ForMember(d => d.ResolvedBy, opt => opt.Ignore())
                .ForMember(d => d.ResolvedById, o => o.MapFrom(s => s.ResolvedBy))
                .ForMember(d => d.Status, opt => opt.Ignore())
                .ForMember(d => d.Type, opt => opt.Ignore())
                .ForMember(d => d.User, opt => opt.Ignore());

            CreateMap<NotificationModel, Notification>()
                .ForMember(d => d.Account, opt => opt.Ignore())
                .ForMember(d => d.CreatedByNavigation, opt => opt.Ignore())
                .ForMember(d => d.Group, opt => opt.Ignore())
                .ForMember(d => d.InverseLinkedNotification, opt => opt.Ignore())
                .ForMember(d => d.LinkedNotification, opt => opt.Ignore())
                .ForMember(d => d.NotificationAccountRequestXref, opt => opt.Ignore())
                .ForMember(d => d.NotificationSuggestedItemXref, opt => opt.Ignore())
                .ForMember(d => d.ResolvedByNavigation, opt => opt.Ignore())
                .ForMember(d => d.Status, opt => opt.Ignore())
                .ForMember(d => d.Type, opt => opt.Ignore())
                .ForMember(d => d.User, opt => opt.Ignore())
                .ForMember(d => d.ResolvedBy, o => o.MapFrom(s => s.ResolvedById));
        }
    }
}
