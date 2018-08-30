using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AMSuite2.API.Features.Core.Users
{
    public class UserGroupsModel
    {
        public int Id { get; set; }
        public int RoleId { get; set; }
        public string Role { get; set; }
    }
}
