using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AMSuite2.API.Features.AgendaManager.Meetings;
using AMSuite2.API.Features.Core.Announcements;
using AMSuite2.API.Features.Core.Notifications;

namespace AMSuite2.API.Features.Core.Dashboard
{
    public interface IDashboardService
    {
        DashboardModel GetDashboard(int userId);
        DashboardMessageModel GetDashboardMessage();
        DashboardMessageModel UpdateDashboardMessage(DashboardMessageModel message);
    }

    public class DashboardService : IDashboardService
    {
        private readonly IDashboardRepository _repo;
        private readonly IAnnouncementsService _announcements;
        private readonly IMeetingsService _meetings;
        private readonly INotificationsService _notifications;

        public DashboardService(
            IDashboardRepository repo,
            IAnnouncementsService announcements,
            IMeetingsService meetings,
            INotificationsService notifications)
        {
            _repo = repo;
            _announcements = announcements;
            _meetings = meetings;
            _notifications = notifications;
        }

        public DashboardMessageModel GetDashboardMessage()
        {
            return _repo.All()
                .OrderBy(x => x.CreatedDate)
                .SingleOrDefault();
        }

        public DashboardModel GetDashboard(int userId)
        {
            return new DashboardModel()
            {
                Announcements = _announcements.GetDashboardAnnouncements(userId),
                Meetings = _meetings.GetDashboardMeetings(userId),
                Message = GetDashboardMessage(),
                Notifications = _notifications.GetDashboardNotifications(userId)
            };
        }

        public DashboardMessageModel UpdateDashboardMessage(DashboardMessageModel model)
        {
            var message = GetDashboardMessage();
            message.Subject = model.Subject;
            message.Description = model.Description;
            message.EndDate = model.EndDate;
            message.StartDate = model.StartDate;
            message.CreatedBy = model.CreatedBy;
            message.CreatedDate = model.CreatedDate;
            message.LastModifiedBy = model.LastModifiedBy;
            message.LastModifiedDate = model.LastModifiedDate;
            
            return _repo.Update(message);
        }
    }
}
