using AMSuite2.API.Infrastructure.Repositories;
using AMSuite2.Entities.DataClasses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AMSuite2.Entities.Context;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace AMSuite2.API.Features.Core.Groups
{
    public interface IGroupsRepository : IBaseRepository<Group, GroupModel>
    {
        IEnumerable<GroupModel> FindByAccount(int accountId);
        IEnumerable<GroupModel> FindByAdministrator(int userId);
        IEnumerable<GroupModel> FindByMeeting(int meetingId);
    }
    public class GroupsRepository : BaseRepository<Group, GroupModel>, IGroupsRepository
    {
        public GroupsRepository(AMSuiteContext context, IMapper mapper) : base(context, mapper)
        {
        }

        public IEnumerable<GroupModel> FindByAccount(int accountId)
        {
            return FindBy(x => x.AccountId == accountId);
        }

        public IEnumerable<GroupModel> FindByAdministrator(int userId)
        {
            return FindBy(x => x.GroupAdministratorId == userId);
        }

        public IEnumerable<GroupModel> FindByMeeting(int meetingId)
        {
            var results = DbSet
                .Join(_context.Agenda.Where(x => x.MeetingId == meetingId),
                    group => group.Id,
                    agenda => agenda.GroupId,
                    (group, agenda) => group
                )
                //.Join(_context.Meeting.Where(x => x.Id == meetingId),
                //    group => group.Id,
                //    meeting => meeting.GroupId,
                //    (group, meeting) => new { group, meeting }
                //)
                .ToList()
                .Distinct();
            return Map(results);
        }

        protected override IQueryable<Group> Include(IQueryable<Group> queryable)
        {
            return queryable.Include(x => x.CreatedByNavigation)
                .Include(y => y.LastModifiedByNavigation);
        }

        protected override IQueryable<Group> IncludeSingle(IQueryable<Group> queryable)
        {
            return Include(queryable);
        }
    }
}
