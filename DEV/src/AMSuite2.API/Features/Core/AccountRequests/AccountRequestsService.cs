using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AMSuite2.API.Features.Core.Accounts;
using AMSuite2.API.Features.Core.Notifications;
using AMSuite2.API.Features.Core.Users;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Razor.TagHelpers;
using Microsoft.AspNetCore.Server.Kestrel.Internal.Http;

namespace AMSuite2.API.Features.Core.AccountRequests
{
    public interface IAccountRequestsService
    {
        IEnumerable<AccountRequestModel> GetAccountRequests(int accountId);
        AccountRequestModel GetAccountRequest(int id);
        AccountRequestModel AddAccountRequest(AccountRequestModel request);
        void DeleteAccountRequest(int id);
    }

    public class AccountRequestsService : IAccountRequestsService
    {
        private readonly IAccountRequestsRepository _repo;
        private readonly INotificationsService _notifications;

        public string LinkUrl(AccountRequestModel request) => $"/{request.AccountId}/members/edit/{request.UserId}";

        public string Message(AccountRequestModel request) =>
            $"{request.UserName} has requested to be added to the {request.AccountName} Account." +
            $" You can review {request.UserName} profile information on their <a href='{LinkUrl(request)}'>profile page</a>." +
            $"<br /><br />Reason For Request:<br />{request.Reason}";

        public AccountRequestsService(IAccountRequestsRepository repo, INotificationsService notifications)
        {
            _repo = repo;
            _notifications = notifications;
        }

        public AccountRequestModel AddAccountRequest(AccountRequestModel request)
        {
            var result = _repo.FindByAccountAndUser(request.AccountId, request.UserId);
            if (result != null)
            {
                DeleteAccountRequest(result.Id);
            }
            var model = BuildNotification(request);
            var notification = _notifications.AddNotification(model);
            request.NotificationId = notification.Id;
            return _repo.Insert(request);
        }

        public void DeleteAccountRequest(int id)
        {
            var notificationId = _repo.DeleteReference(id);
            _notifications.DeleteNotification(notificationId);
        }

        public AccountRequestModel GetAccountRequest(int id)
        {
            return _repo.FindByKey(id);
        }

        public IEnumerable<AccountRequestModel> GetAccountRequests(int accountId)
        {
            return _repo.FindByAccount(accountId);
        }

        private NotificationModel BuildNotification(AccountRequestModel request)
        {
            return new NotificationModel()
            {
                AccountId = request.AccountId,
                CreatedBy = request.CreatedBy,
                CreatedDate = DateTime.Now,
                Id = 0,
                LinkText = "",
                LinkUrl = "",
                Message = Message(request),
                StatusId = request.NotificationStatusId,
                TypeId = request.NotificationTypeId,
                UserId = request.UserId
            };
        }
    }
}
