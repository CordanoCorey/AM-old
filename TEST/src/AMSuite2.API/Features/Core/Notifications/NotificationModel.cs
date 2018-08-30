using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AMSuite2.API.Features.Core.Accounts;
using AMSuite2.API.Features.Core.Groups;
using AMSuite2.API.Features.Core.Users;
using AMSuite2.API.Infrastructure.Models;

namespace AMSuite2.API.Features.Core.Notifications
{
    public class NotificationModel : BaseEntity, IEntity
    {
        public int Id { get; set; }
        public AccountModel Account { get; set; }
        public int AccountId { get; set; }
        public GroupModel Group { get; set; }
        public int? GroupId { get; set; }
        public NotificationModel LinkedNotification { get; set; }
        public int? LinkedNotificationId { get; set; }
        public string LinkText { get; set; }
        public string LinkUrl { get; set; }
        public string Message { get; set; }
        public UserModel ResolvedBy { get; set; }
        public int? ResolvedById { get; set; }
        public string Status { get; set; }
        public int StatusId { get; set; }
        public string Type { get; set; }
        public int TypeId { get; set; }
        public UserModel User { get; set; }
        public int? UserId { get; set; }
    }
}
