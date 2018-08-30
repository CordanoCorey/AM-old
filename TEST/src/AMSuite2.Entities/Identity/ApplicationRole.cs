using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace AMSuite2.Entities.Identity
{
    public partial class ApplicationRole : IdentityRole<int>
    {
        public int UserId { get; set; }
        public int RoleId { get; set; }
        public int AccountId { get; set; }
        public bool IsUserActive { get; set; }
        public bool PrimaryAccount { get; set; }
    }
}
