using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Remotion.Linq.Parsing.Structure.IntermediateModel;

namespace AMSuite2.API.Features.Core.Notifications
{
    public interface INotificationsService
    {
        IEnumerable<NotificationModel> GetNotifications();
        NotificationModel GetNotification(int id);
        NotificationModel AddNotification(NotificationModel model);
        NotificationModel UpdateNotification(NotificationModel model);
        void DeleteNotification(int id);
        IEnumerable<NotificationModel> GetUserNotifications(int userId);
        IEnumerable<NotificationModel> GetDashboardNotifications(int userId);
    }
    public class NotificationsService : INotificationsService
    {
        private readonly INotificationsRepository _repo;

        public NotificationsService(INotificationsRepository repo)
        {
            _repo = repo;
        }

        public NotificationModel AddNotification(NotificationModel model)
        {
            return _repo.Insert(model);
        }

        public NotificationModel UpdateNotification(NotificationModel model)
        {
            return _repo.Update(model);
        }

        public void DeleteNotification(int id)
        {
            _repo.Delete(id);
        }

        public IEnumerable<NotificationModel> GetUserNotifications(int userId)
        {
            return _repo.FindByUser(userId);
        }

        public IEnumerable<NotificationModel> GetDashboardNotifications(int userId)
        {
            return _repo.FindByUser(userId);
        }

        public NotificationModel GetNotification(int id)
        {
            return _repo.FindByKey(id);
        }

        public IEnumerable<NotificationModel> GetNotifications()
        {
            return _repo.All();
        }
    }
}
