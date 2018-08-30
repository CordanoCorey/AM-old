using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;
using AMSuite2.API.Infrastructure.Models;
using AMSuite2.API.Infrastructure.Repositories;
using AMSuite2.Entities.Context;
using AMSuite2.Entities.Identity;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace AMSuite2.API.Features.Core.Login
{
    public interface ILoginRepository : IBaseRepository<ApplicationUser, CurrentUserModel>
    {
        CurrentUserModel FindByEmail(string email);
        CurrentUserModel FindByPasswordResetCode(string code);
    }
    public class LoginRepository : BaseRepository<ApplicationUser, CurrentUserModel>, ILoginRepository
    {
        public LoginRepository(AMSuiteContext context, IMapper mapper) : base(context, mapper)
        {
        }

        public CurrentUserModel FindByEmail(string email) => FindByKey(email, "Email");

        public CurrentUserModel FindByPasswordResetCode(string code) => FindByKey(code, "PasswordResetCode");

        protected override IQueryable<ApplicationUser> Include(IQueryable<ApplicationUser> queryable)
        {
            return queryable.Include(x => x.AccountUserRoleXref)
                .Include(y => y.GroupMembershipXref);
        }

        public override CurrentUserModel Update(CurrentUserModel model)
        {
            var entity = UpdateUnsaved(model);
            _context.Entry(entity).Property(x => x.FullName).IsModified = false;
            Save();
            return _mapper.Map<CurrentUserModel>(entity);
        }
    }
}
