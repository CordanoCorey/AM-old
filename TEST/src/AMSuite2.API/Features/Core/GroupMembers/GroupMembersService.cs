using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AMSuite2.API.Infrastructure.Models;

namespace AMSuite2.API.Features.Core.GroupMembers
{
    public interface IGroupMembersService
    {
        SearchResults<GroupMemberModel> GetGroupMembers(int groupId);
        SearchResults<GroupMemberModel> GetGroupMembers(int groupId, QueryModel<GroupMemberModel> query);
        IEnumerable<GroupMemberModel> GetGroupMember(int groupId, int userId);
        GroupMemberModel AddGroupMember(GroupMemberModel member);
        IEnumerable<GroupMemberModel> UpdateGroupMembers(int groupId, IEnumerable<GroupMemberModel> members);
        IEnumerable<GroupMemberModel> GetUserGroups(int userId);
        IEnumerable<int> GetUserGroupIds(int userId);
        IEnumerable<GroupMemberModel> UpdateUserGroups(int userId, IEnumerable<GroupMemberModel> groups);
        int GetMemberCount(int groupId);
        IEnumerable<int> GetMemberCount(IEnumerable<int> groupIds);
    }

    public class GroupMembersService : IGroupMembersService
    {
        private readonly IGroupMembersRepository _repo;

        public GroupMembersService(IGroupMembersRepository repo)
        {
            _repo = repo;
        }

        public GroupMemberModel AddGroupMember(GroupMemberModel member)
        {
            return _repo.Insert(member);
        }

        public IEnumerable<GroupMemberModel> GetGroupMember(int groupId, int userId)
        {
            return _repo.FindByGroupAndUser(groupId, userId);
        }

        public SearchResults<GroupMemberModel> GetGroupMembers(int groupId)
        {
            var query = new QueryModel<GroupMemberModel>();
            var results = _repo.FindByGroup(groupId);
            var total = _repo.Count();
            return new SearchResults<GroupMemberModel>()
            {
                // Query = query,
                Results = results,
                Total = total
            };
        }

        public SearchResults<GroupMemberModel> GetGroupMembers(int groupId, QueryModel<GroupMemberModel> query)
        {
            var members = _repo.FindByGroup(groupId);
            var results = _repo.Query(members, query);
            var total = _repo.Count();
            return new SearchResults<GroupMemberModel>()
            {
                // Query = query,
                Results = results,
                Total = total
            };
        }

        public IEnumerable<GroupMemberModel> GetUserGroups(int userId)
        {
            var groups = _repo.FindByUser(userId).OrderBy(x => x.Group.Name);
            //TODO: optimize member count query
            return groups.Select(x =>
            {
                x.Group.MemberCount = GetMemberCount(x.GroupId);
                return x;
            });
        }

        public IEnumerable<int> GetUserGroupIds(int userId)
        {
            return GetUserGroups(userId).Select(x => x.GroupId);
        }

        public IEnumerable<GroupMemberModel> UpdateGroupMembers(int groupId, IEnumerable<GroupMemberModel> members)
        {
            //Delete current group members
            _repo.DeleteGroupMembers(groupId);

            //Add new group members
            _repo.Insert(members);

            return GetGroupMembers(groupId).Results;
        }

        public IEnumerable<GroupMemberModel> UpdateUserGroups(int userId, IEnumerable<GroupMemberModel> groups)
        {
            //Delete current user groups
            _repo.DeleteUserGroups(userId);

            //Add new user groups
            _repo.Insert(groups);

            return GetUserGroups(userId);
        }

        public int GetMemberCount(int groupId)
        {
            return _repo.GetMemberCount(groupId);
        }

        public IEnumerable<int> GetMemberCount(IEnumerable<int> groupIds)
        {
            return _repo.GetMemberCount(groupIds);
        }
    }
}
