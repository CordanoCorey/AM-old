using System;
using System.Collections.Generic;
using System.Linq;
using AMSuite2.API.Features.Core.Accounts;
using AMSuite2.Entities.DataClasses;
using AutoMapper;

namespace AMSuite2.API.Infrastructure.Mapper
{
    public class AccountMapProfile : Profile
    {
        public AccountMapProfile()
        {
            CreateMap<Account, AccountModel>()
                .ForMember(d => d.Description, o => o.MapFrom(s => s.AccountDescription))
                .ForMember(d => d.EmailAgendaTemplate, o => o.MapFrom(s => s.MailAgendaTemplate))
                .ForMember(d => d.EmailTemplate, o => o.MapFrom(s => s.MailItemTemplate))
                .ForMember(d => d.Logo, opt => opt.Ignore())
                .ForMember(d => d.Name, o => o.MapFrom(s => s.AccountName))
                .ForMember(d => d.OwnerId, o => o.MapFrom(s => s.AccountOwnerId))
                .ForMember(d => d.Status, o => o.MapFrom(s => s.AccountStatus.Name))
                .ForMember(d => d.StatusId, o => o.MapFrom(s => s.AccountStatusId))
                .ForMember(d => d.Url, o => o.MapFrom(s => s.Urlbase));

            CreateMap<AccountModel, Account>()
                .ForMember(d => d.AccountDescription, o => o.MapFrom(s => s.Description))
                .ForMember(d => d.AccountLogo, opt => opt.Ignore())
                .ForMember(d => d.AccountName, o => o.MapFrom(s => s.Name))
                .ForMember(d => d.AccountOwnerId, o => o.MapFrom(s => s.OwnerId))
                .ForMember(d => d.AccountStatus, opt => opt.Ignore())
                .ForMember(d => d.AccountStatusId, o => o.MapFrom(s => s.StatusId))
                .ForMember(d => d.AccountUserRoleXref, opt => opt.Ignore())
                .ForMember(d => d.Announcement, opt => opt.Ignore())
                .ForMember(d => d.BinAgendaItemData, opt => opt.Ignore())
                .ForMember(d => d.Group, opt => opt.Ignore())
                .ForMember(d => d.MailAgendaTemplate, o => o.MapFrom(s => s.EmailAgendaTemplate))
                .ForMember(d => d.MailItemTemplate, o => o.MapFrom(s => s.EmailTemplate))
                .ForMember(d => d.Meeting, opt => opt.Ignore())
                .ForMember(d => d.Notification, opt => opt.Ignore())
                .ForMember(d => d.Urlbase, o => o.MapFrom(s => s.Url));
        }
    }
}
