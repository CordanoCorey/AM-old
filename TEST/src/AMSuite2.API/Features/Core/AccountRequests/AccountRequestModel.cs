using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AMSuite2.API.Features.Core.Accounts;
using AMSuite2.API.Features.Core.Notifications;
using AMSuite2.API.Features.Core.Users;
using AMSuite2.API.Infrastructure.Models;

namespace AMSuite2.API.Features.Core.AccountRequests
{
    public class AccountRequestModel : BaseEntity
    {
        public int Id { get; set; }
        public AccountModel Account { get; set; }
        public int AccountId { get; set; }
        public string AccountName { get; set; }
        public NotificationModel Notification { get; set; }
        public int NotificationId { get; set; }
        public string Reason { get; set; }
        public string NotificationStatus { get; set; }
        public int NotificationStatusId { get; set; }
        public string NotificationType { get; set; }
        public int NotificationTypeId { get; set; }
        public UserModel User { get; set; }
        public int UserId { get; set; }
        public string UserName { get; set; }
    }
}
