using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AMSuite2.Entities.Context;

namespace AMSuite2.API.Infrastructure.Auth
{
    public interface IAuthRepository
    {
        bool HasAccessToAccount(long userId, long accountId, bool readonlyAccess);
    }
    public class AuthRepository : IAuthRepository
    {
        private readonly AMSuiteContext _context;
        public AuthRepository(AMSuiteContext context)
        {
            _context = context;
        }

        public bool HasAccessToAccount(long userId, long accountId, bool readonlyAccess)
        {
            //If it's a GET request then any role works.  
            //else a POST, PUT, or DEL then they need another role beyond simple member.
            //TODO-Find enums for role ids.
            return readonlyAccess ? _context.AccountUserRoleXref.Any(x => x.IsUserActive 
                && x.UserId == userId 
                && x.AccountId == accountId) :
                _context.AccountUserRoleXref.Any(x => x.IsUserActive
                && x.UserId == userId
                && x.AccountId == accountId && x.RoleId != 4);
        }
    }
}
