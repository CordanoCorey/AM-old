using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AMSuite2.API.Infrastructure.Models;

namespace AMSuite2.API.Features.Core.Users
{
    public interface IUsersService
    {
        SearchResults<UserModel> GetUsers(QueryModel<UserModel> query);
        UserModel GetUser(int id);
        UserRoleModel GetUserRoles(int id);
        UserModel AddUser(UserModel user);
        UserModel UpdateUser(UserModel user);
        void DeleteUser(int id);
        IEnumerable<UserModel> GetGroupUsers(int groupId);
    }

    public class UsersService : IUsersService
    {
        private readonly IUsersRepository _repo;

        public UsersService(IUsersRepository repo)
        {
            _repo = repo;
        }

        public UserModel AddUser(UserModel user)
        {
            return _repo.Insert(user);
        }

        public void DeleteUser(int id)
        {
            _repo.Delete(id);
        }

        public IEnumerable<UserModel> GetGroupUsers(int groupId)
        {
            throw new NotImplementedException();
        }

        public UserModel GetUser(int id)
        {
            return _repo.FindByKey(id);
        }

        public UserRoleModel GetUserRoles(int id)
        {
            throw new NotImplementedException();
        }

        public SearchResults<UserModel> GetUsers(QueryModel<UserModel> query)
        {
            var results = query.IsNullOrDefault ? _repo.All() : _repo.FindBy(query);
            return new SearchResults<UserModel>()
            {
                Results = results
            };
        }

        public UserModel UpdateUser(UserModel user)
        {
            var existing = GetUser(user.Id);
            existing.AgendaDateRangeId = user.AgendaDateRangeId;
            existing.AutoSaveEnabled = user.AutoSaveEnabled;
            existing.DefaultGroupId = user.DefaultGroupId;
            existing.EmailAddress = user.EmailAddress;
            existing.FailedPasswordAttemptCount = user.FailedPasswordAttemptCount;
            existing.FirstName = user.FirstName;
            existing.GeneralInfo = user.GeneralInfo;
            existing.IsActive = user.IsActive;
            existing.IsLockedOut = user.IsLockedOut;
            existing.LastLockoutDate = user.LastLockoutDate;
            existing.LastLoginDate = user.LastLoginDate;
            existing.LastName = user.LastName;
            existing.MiddleName = user.MiddleName;
            existing.UserName = user.UserName;
            existing.UserTitle = user.UserTitle;
            existing.WarnOnDirty = user.WarnOnDirty;
            return _repo.Update(existing);
        }
    }
}
