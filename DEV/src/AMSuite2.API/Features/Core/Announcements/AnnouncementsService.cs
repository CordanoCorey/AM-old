using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AMSuite2.API.Features.Core.AccountMembers;
using AMSuite2.API.Features.Core.GroupMembers;
using AMSuite2.API.Infrastructure.Models;

namespace AMSuite2.API.Features.Core.Announcements
{
    public interface IAnnouncementsService
    {
        SearchResults<AnnouncementModel> GetAnnouncements(QueryModel<AnnouncementModel> query);
        AnnouncementModel GetAnnouncement(int id);
        AnnouncementModel AddAnnouncement(AnnouncementModel model);
        AnnouncementModel UpdateAnnouncement(AnnouncementModel model);
        void DeleteAnnouncement(int id);
        IEnumerable<AnnouncementModel> GetDashboardAnnouncements(int userId);
        IEnumerable<AnnouncementModel> GetUserAnnouncements(int userId);
        IEnumerable<AnnouncementModel> GetAccountAnnouncements(int accountId);
        IEnumerable<AnnouncementModel> GetGroupAnnouncements(int groupId);
    }
    public class AnnouncementsService : IAnnouncementsService
    {
        private readonly IAnnouncementsRepository _repo;
        private readonly IAccountMembersService _accountMembers;
        private readonly IGroupMembersService _groupMembers;

        public AnnouncementsService(IAnnouncementsRepository repo, IAccountMembersService accountMembers, IGroupMembersService groupMembers)
        {
            _repo = repo;
            _accountMembers = accountMembers;
            _groupMembers = groupMembers;

        }

        public AnnouncementModel AddAnnouncement(AnnouncementModel model)
        {
            return _repo.Insert(model);
        }

        public void DeleteAnnouncement(int id)
        {
            _repo.Delete(id);
        }

        public AnnouncementModel GetAnnouncement(int id)
        {
            return _repo.FindByKey(id);
        }

        public SearchResults<AnnouncementModel> GetAnnouncements(QueryModel<AnnouncementModel> query)
        {
            var results = query.IsNullOrDefault ? _repo.All() : _repo.FindBy(query);
            return new SearchResults<AnnouncementModel>()
            {
                Results = results
            };
        }

        public AnnouncementModel UpdateAnnouncement(AnnouncementModel announcement)
        {
            return _repo.Update(announcement);
        }

        /**
         *  Pull ALL system announcements
         *  Pull account announcements for this user's account
         *  Pull group announcements for groups this user is a member of
         *  Get all group announcements types, based on accountid passed in, and where group administrator ID equals the current user id
         */
        public IEnumerable<AnnouncementModel> GetDashboardAnnouncements(int userId)
        {
            var systemAnnouncements = _repo.FindSystemAnnouncements();
            var accountAnnouncements = _repo.FindByAccount(_accountMembers.GetUserAccountIds(userId));
            var groupAnnouncements = _repo.FindByGroup(_groupMembers.GetUserGroupIds(userId));

            return systemAnnouncements.Union(accountAnnouncements).Union(groupAnnouncements);
        }

        /**
         * Get announcements created by user.
         */
        public IEnumerable<AnnouncementModel> GetUserAnnouncements(int userId)
        {
            return _repo.FindByUser(userId);
        }

        public IEnumerable<AnnouncementModel> GetAccountAnnouncements(int accountId)
        {
            return _repo.FindByAccount(accountId);
        }

        public IEnumerable<AnnouncementModel> GetGroupAnnouncements(int groupId)
        {
            return _repo.FindByGroup(groupId);
        }
    }
}
