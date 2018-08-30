using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AMSuite2.API.Infrastructure.Models;

namespace AMSuite2.API.Features.Core.Profile
{
    public class ProfileModel : BaseEntity
    {
        public CurrentUserModel User { get; set; }
        public int UserId { get; set; }
        public bool AutoSaveEnabled { get; set; }
        public string EmailAddress { get; set; }
        public string FirstName { get; set; }
        public string GeneralInfo { get; set; }
        public string LastName { get; set; }
        public string UserTitle { get; set; }
        public bool WarnOnDirty { get; set; }
        public string NewPassword { get; set; }
        public string ConfirmPassword { get; set; }
    }
}
