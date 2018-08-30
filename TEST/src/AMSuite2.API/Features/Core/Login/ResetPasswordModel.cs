using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AMSuite2.API.Features.Core.Login
{
    public class ResetPasswordModel
    {
        public string PasswordResetCode { get; set; }
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }
    }
    public class RecoverPasswordModel
    {
        public string EmailAddress { get; set; }
    }
}
