using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using AMSuite2.API.Features.Core.GroupMembers;
using AMSuite2.Entities.DataClasses;

namespace AMSuite2.API.Infrastructure.Mapper
{
    public class GroupMemberMapProfile : Profile
    {
        public GroupMemberMapProfile()
        {
            CreateMap<GroupMembershipXref, GroupMemberModel>()
                .ForMember(d => d.User, o => o.MapFrom(s => s.AgendaUser))
                .ForMember(d => d.UserId, o => o.MapFrom(s => s.AgendaUserId))
                .ForMember(d => d.GroupRole, o => o.MapFrom(s => s.GroupRole.Name))
                .ForMember(d => d.AccountId, o => o.MapFrom(s => s.Group.AccountId))
                .ForMember(d => d.IsManager, opt => opt.Ignore())
                .ForMember(d => d.IsContributor, opt => opt.Ignore())
                .ForMember(d => d.IsMember, opt => opt.Ignore())
                .ForMember(d => d.IsAttendanceTaker, opt => opt.Ignore())
                .ForMember(d => d.IsMinuteTaker, opt => opt.Ignore())
                .ForMember(d => d.IsVoteTaker, opt => opt.Ignore())
                .ForMember(d => d.IsVoter, opt => opt.Ignore());

            CreateMap<GroupMemberModel, GroupMembershipXref>()
                .ForMember(d => d.AgendaUserId, o => o.MapFrom(s => s.UserId))
                .ForMember(d => d.AgendaUser, opt => opt.Ignore())
                .ForMember(d => d.Group, opt => opt.Ignore())
                .ForMember(d => d.GroupRole, opt => opt.Ignore());
        }
    }
}
