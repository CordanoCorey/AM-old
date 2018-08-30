using AMSuite2.API.Infrastructure.Repositories;
using AMSuite2.Entities.DataClasses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AMSuite2.Entities.Context;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace AMSuite2.API.Features.Core.Announcements
{
    public interface IAnnouncementsRepository : IBaseRepository<Announcement, AnnouncementModel>
    {
        IEnumerable<AnnouncementModel> FindByAccount(int accountId);
        IEnumerable<AnnouncementModel> FindByAccount(IEnumerable<int> ids);
        IEnumerable<AnnouncementModel> FindByGroup(int groupId);
        IEnumerable<AnnouncementModel> FindByGroup(IEnumerable<int> ids);
        IEnumerable<AnnouncementModel> FindByUser(int userId);
        IEnumerable<AnnouncementModel> FindSystemAnnouncements();
    }
    public class AnnouncementsRepository : BaseRepository<Announcement, AnnouncementModel>, IAnnouncementsRepository
    {
        public AnnouncementsRepository(AMSuiteContext context, IMapper mapper) : base(context, mapper)
        {
        }

        public IEnumerable<AnnouncementModel> FindByAccount(int accountId)
        {
            return accountId == 6 ? All() : FindBy(x => x.AnnouncementTypeId == 2 && x.AccountId == accountId);
        }

        public IEnumerable<AnnouncementModel> FindByAccount(IEnumerable<int> ids)
        {
            return FindBy(x => x.AnnouncementTypeId == 2 && ids.Contains(x.AccountId.Value));
        }

        public IEnumerable<AnnouncementModel> FindByGroup(int groupId)
        {
            return FindBy(x => x.AnnouncementTypeId == 3 && x.GroupId == groupId);
        }

        public IEnumerable<AnnouncementModel> FindByGroup(IEnumerable<int> ids)
        {
            return FindBy(x => x.AnnouncementTypeId == 3 && ids.Contains(x.GroupId.Value));
        }

        public IEnumerable<AnnouncementModel> FindByUser(int userId)
        {
            return FindBy(x => x.CreatedBy == userId);
        }

        public IEnumerable<AnnouncementModel> FindSystemAnnouncements()
        {
            return FindBy(x => x.AnnouncementTypeId == 1);
        }

        protected override IQueryable<Announcement> Include(IQueryable<Announcement> queryable)
        {
            return queryable.Include(x => x.AnnouncementType);
        }

        protected override IQueryable<Announcement> IncludeSingle(IQueryable<Announcement> queryable)
        {
            return Include(queryable);
        }
    }
}
