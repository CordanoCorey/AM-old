using AMSuite2.API.Infrastructure.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AMSuite2.Entities.Context;
using AMSuite2.Entities.DataClasses;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace AMSuite2.API.Features.Core.Notifications
{
    public interface INotificationsRepository : IBaseRepository<Notification, NotificationModel>
    {
        IEnumerable<NotificationModel> FindByUser(int userId);
    }
    public class NotificationsRepository : BaseRepository<Notification, NotificationModel>, INotificationsRepository
    {
        public NotificationsRepository(AMSuiteContext context, IMapper mapper) : base(context, mapper)
        {
        }

        public IEnumerable<NotificationModel> FindByUser(int userId)
        {
            return FindBy(x => x.UserId == userId);
        }

        protected override IQueryable<Notification> Include(IQueryable<Notification> queryable)
        {
            return queryable.Include(x => x.Account);
        }
    }
}
