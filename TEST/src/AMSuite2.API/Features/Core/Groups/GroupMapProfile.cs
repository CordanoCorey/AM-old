using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AMSuite2.API.Features.Core.Groups;
using AMSuite2.Entities.DataClasses;
using AutoMapper;

namespace AMSuite2.API.Infrastructure.Mapper
{
    public class GroupMapProfile : Profile
    {
        public GroupMapProfile()
        {
            CreateMap<Group, GroupModel>()
                .ForMember(d => d.AdministratorId, o => o.MapFrom(s => s.GroupAdministratorId))
                .ForMember(d => d.Description, o => o.MapFrom(s => s.GroupDescription))
                .ForMember(d => d.Name, o => o.MapFrom(s => s.GroupName))
                .ForMember(d => d.CreatedByName, o => o.MapFrom(s => s.CreatedByNavigation.FullName))
                .ForMember(d => d.LastModifiedByName, o => o.MapFrom(s => s.LastModifiedByNavigation.FullName));
                //.ForMember(d => d.Members, o => o.MapFrom(s => s.GroupMembershipXref));

            CreateMap<GroupModel, Group>()
                .ForMember(d => d.GroupAdministratorId, o => o.MapFrom(s => s.AdministratorId))
                .ForMember(d => d.GroupDescription, o => o.MapFrom(s => s.Description))
                .ForMember(d => d.GroupName, o => o.MapFrom(s => s.Name));
            //.ForMember(d => d.GroupMembershipXref, o => o.MapFrom(s => s.Members));
        }
    }
}
