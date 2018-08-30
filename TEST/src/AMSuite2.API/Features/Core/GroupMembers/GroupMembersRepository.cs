using AMSuite2.API.Infrastructure.Repositories;
using AMSuite2.Entities.DataClasses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AMSuite2.Entities.Context;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace AMSuite2.API.Features.Core.GroupMembers
{
    public interface IGroupMembersRepository : IBaseRepository<GroupMembershipXref, GroupMemberModel>
    {
        IEnumerable<GroupMemberModel> FindByGroup(int groupId);
        IQueryable<GroupMembershipXref> FindByGroupUnsaved(int groupId);
        IEnumerable<GroupMemberModel> FindByUser(int userId);
        IQueryable<GroupMembershipXref> FindByUserUnsaved(int userId);
        IEnumerable<GroupMemberModel> FindByGroupAndUser(int groupId, int userId);
        void DeleteGroupMembers(int groupId);
        void DeleteUserGroups(int userId);
        int GetMemberCount(int groupId);
        IEnumerable<int> GetMemberCount(IEnumerable<int> groupIds);
    }
    public class GroupMembersRepository : BaseRepository<GroupMembershipXref, GroupMemberModel>, IGroupMembersRepository
    {
        public GroupMembersRepository(AMSuiteContext context, IMapper mapper) : base(context, mapper)
        {
        }

        public IEnumerable<GroupMemberModel> FindByGroup(int groupId)
        {
            IEnumerable<GroupMembershipXref> results = BaseDbSet
                .Where(x => x.GroupId == groupId)
                .Include(y => y.Group)
                .Include(y => y.GroupRole)
                .Include(z => z.AgendaUser)
                .ToList();
            return results.Select(Map);
        }

        public IQueryable<GroupMembershipXref> FindByGroupUnsaved(int groupId)
        {
            IQueryable<GroupMembershipXref> results = BaseDbSet
                .Where(x => x.GroupId == groupId);
            return results;
        }

        public IEnumerable<GroupMemberModel> FindByUser(int userId)
        {
            return FindBy(x => x.AgendaUserId == userId);
        }

        public IQueryable<GroupMembershipXref> FindByUserUnsaved(int userId)
        {
            IQueryable<GroupMembershipXref> results = BaseDbSet
                .Where(x => x.AgendaUserId == userId);
            return results;
        }

        public IQueryable<GroupMembershipXref> FindMemberByUserUnsaved(int userId)
        {
            IQueryable<GroupMembershipXref> results = BaseDbSet
                .Where(x => x.AgendaUserId == userId && x.GroupRoleId == 3);
            return results;
        }

        public IEnumerable<GroupMemberModel> FindByGroupAndUser(int groupId, int userId)
        {
            IEnumerable<GroupMembershipXref> results = BaseDbSet
                .Where(x => x.GroupId == groupId && x.AgendaUserId == userId)
                .Include(y => y.GroupRole)
                .Include(z => z.AgendaUser)
                .Include(q => q.Group)
                    .ThenInclude(g => g.CreatedByNavigation)
                .ToList();
            return results.Select(Map);
        }

        public void DeleteGroupMembers(int groupId)
        {
            var members = FindByGroupUnsaved(groupId);
            foreach (var member in members)
            {
                _dbSet.Remove(member);
            }
            Save();
        }

        public void DeleteUserGroups(int userId)
        {
            var members = FindMemberByUserUnsaved(userId);
            foreach (var member in members)
            {
                _dbSet.Remove(member);
            }
            Save();
        }

        protected override IQueryable<GroupMembershipXref> Include(IQueryable<GroupMembershipXref> queryable)
        {
            return queryable.Include(x => x.Group)
                    .ThenInclude(g => g.CreatedByNavigation)
                .Include(y => y.GroupRole);
        }

        public override GroupMemberModel Map(GroupMembershipXref entity)
        {
            var groupRole = entity.GroupRole.Name;
            var model = _mapper.Map<GroupMemberModel>(entity);
            model.GroupRole = groupRole;
            return model;
        }

        public int GetMemberCount(int groupId)
        {
            return BaseDbSet.Count(x => x.GroupId == groupId);
        }

        public IEnumerable<int> GetMemberCount(IEnumerable<int> groupIds)
        {
            return groupIds.Select(GetMemberCount);
        }
    }
}
