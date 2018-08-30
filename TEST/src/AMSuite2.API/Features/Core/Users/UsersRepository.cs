using AMSuite2.API.Infrastructure.Repositories;
using AMSuite2.Entities.DataClasses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AMSuite2.API.Features.Core.GroupMembers;
using AMSuite2.API.Infrastructure.Models;
using AMSuite2.Entities.Context;
using AMSuite2.Entities.Identity;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace AMSuite2.API.Features.Core.Users
{
    public interface IUsersRepository : IBaseRepository<ApplicationUser, UserModel>
    {
        UserModel FindByEmail(string email);
        IEnumerable<UserAccountsModel> GetUserAccounts(int userId);
        IEnumerable<GroupMemberModel> GetUserGroups(int userId);
    }

    public class UsersRepository : BaseRepository<ApplicationUser, UserModel>, IUsersRepository
    {
        public UsersRepository(AMSuiteContext context, IMapper mapper) : base(context, mapper)
        {
        }

        public override IEnumerable<UserModel> FindBy(QueryModel<UserModel> query)
        {
            return query.Term == null ? base.FindBy(query) : FindBy(query, x => x.FirstName.Contains(query.Term) || x.LastName.Contains(query.Term));
        }

        public UserModel FindByEmail(string email)
        {
            return FindByKey(email, "Email");
        }

        public IEnumerable<UserAccountsModel> GetUserAccounts(int userId)
        {
            return _context.Users.Include(a => a.AccountUserRoleXref).SingleOrDefault(x => x.Id == userId)
                .AccountUserRoleXref.Where(x => x.IsUserActive)
                .Select(
                    y => new UserAccountsModel()
                    {
                        Id = y.AccountId,
                        IsPrimary = y.PrimaryAccount.HasValue && y.PrimaryAccount.Value,
                        RoleId = y.RoleId
                    }
                );
        }

        public IEnumerable<GroupMemberModel> GetUserGroups(int userId)
        {
            var user = FindByKeyInclude(userId, x => x.GroupMembershipXref);
            return user.UserGroups;
        }

        public override UserModel Update(UserModel model)
        {
            ApplicationUser entity = _mapper.Map<ApplicationUser>(model);
            _context.Entry(entity).State = EntityState.Modified;
            _context.Entry(entity).Property(x => x.AccessFailedCount).IsModified = false;
            //_context.Entry(entity).Property(x => x.ConcurrencyStamp).IsModified = false;
            _context.Entry(entity).Property(x => x.EmailConfirmed).IsModified = false;
            _context.Entry(entity).Property(x => x.FullName).IsModified = false;
            _context.Entry(entity).Property(x => x.LastPasswordChangedDate).IsModified = false;
            _context.Entry(entity).Property(x => x.LockoutEnabled).IsModified = false;
            _context.Entry(entity).Property(x => x.LockoutEnd).IsModified = false;
            _context.Entry(entity).Property(x => x.NormalizedEmail).IsModified = false;
            _context.Entry(entity).Property(x => x.NormalizedUserName).IsModified = false;
            _context.Entry(entity).Property(x => x.Password).IsModified = false;
            _context.Entry(entity).Property(x => x.PasswordHash).IsModified = false;
            _context.Entry(entity).Property(x => x.PasswordResetCode).IsModified = false;
            _context.Entry(entity).Property(x => x.PhoneNumber).IsModified = false;
            _context.Entry(entity).Property(x => x.PhoneNumberConfirmed).IsModified = false;
            _context.Entry(entity).Property(x => x.SecurityStamp).IsModified = false;
            _context.Entry(entity).Property(x => x.ServerSalt).IsModified = false;
            _context.Entry(entity).Property(x => x.TwoFactorEnabled).IsModified = false;
            Save();
            return _mapper.Map<UserModel>(entity);
        }
    }
}
