using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata.Ecma335;
using System.Threading.Tasks;
using AMSuite2.API.Features.Core.GroupMembers;
using AMSuite2.API.Infrastructure.Models;

namespace AMSuite2.API.Features.Core.Groups
{
    public interface IGroupsService
    {
        SearchResults<GroupModel> GetGroups(QueryModel<GroupModel> query);
        GroupModel GetGroup(int id);
        GroupModel AddGroup(GroupModel model);
        GroupModel UpdateGroup(GroupModel model);
        void DeleteGroup(int id);
        IEnumerable<GroupModel> GetAccountGroups(int accountId);
        IEnumerable<GroupModel> GetAdministratorGroups(int userId);
        IEnumerable<GroupModel> GetMeetingGroups(int meetingId);
    }

    public class GroupsService : IGroupsService
    {
        private readonly IGroupsRepository _repo;
        private readonly IGroupMembersService _members;

        public GroupsService(IGroupsRepository repository, IGroupMembersService members)
        {
            _repo = repository;
            _members = members;
        }

        public SearchResults<GroupModel> GetGroups(QueryModel<GroupModel> query)
        {
            var results = query.IsNullOrDefault ? _repo.All() : _repo.FindBy(query);
            return new SearchResults<GroupModel>()
            {
                Results = results
            };
        }

        public GroupModel GetGroup(int id)
        {
            var group = _repo.FindByKey(id);
            group.Members = _members.GetGroupMembers(group.Id).Results.Select(x =>
            {
                x.AccountId = group.AccountId;
                return x;
            });
            return group;
        }

        public IEnumerable<GroupModel> GetAccountGroups(int accountId)
        {
            return _repo.FindByAccount(accountId);
        }

        public GroupModel AddGroup(GroupModel model)
        {
            var members = model.Members;
            var group = _repo.Insert(model);
            group.Members = _members.UpdateGroupMembers(group.Id, members);
            return group;
        }

        public GroupModel UpdateGroup(GroupModel model)
        {
            var members = _members.UpdateGroupMembers(model.Id, model.Members);
            var group = _repo.Update(model);
            group.Members = members;
            return group;
        }

        public void DeleteGroup(int id)
        {
            _repo.Delete(id);
        }

        public IEnumerable<GroupModel> GetMeetingGroups(int meetingId)
        {
            return _repo.FindByMeeting(meetingId);
        }

        public IEnumerable<GroupModel> GetAdministratorGroups(int userId)
        {
            return _repo.FindByAdministrator(userId);
        }
    }
}
