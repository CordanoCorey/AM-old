using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AMSuite2.API.Features.Core.Users
{
    public class UserAccountsModel
    {
        public int Id { get; set; }
        public bool IsPrimary { get; set; }
        public int RoleId { get; set; }
    }
}
