using AMSuite2.API.Infrastructure.Models;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;
using AMSuite2.API.Infrastructure.Auth;

namespace AMSuite2.API.Features.Core.Login
{
    public interface ILoginService
    {
        //Task<LoggedInUserModel> Login(string userName);
        CurrentUserModel RecoverPassword(string email);
        CurrentUserModel ResetPassword(ResetPasswordModel model);
    }
    public class LoginService : ILoginService
    {
        private readonly ILoginRepository _repo;
        private readonly ITokenProviderService _auth;

        public LoginService(ILoginRepository repo, ITokenProviderService auth)
        {
            _repo = repo;
            _auth = auth;
        }

        //public async Task<LoggedInUserModel> Login(string email)
        //{
        //    return await _auth.GetLoggedInUser(email,);
        //}

        public CurrentUserModel RecoverPassword(string email)
        {
            var user = _repo.FindByEmail(email);

            if (string.IsNullOrEmpty(user.PasswordResetCode))
            {
                user.PasswordResetCode = GeneratePasswordLinkCode();
            }

            //TODO: Send Reset Password Email

            return _repo.Update(user);
        }

        public CurrentUserModel ResetPassword(ResetPasswordModel model)
        {
            var user = _repo.FindByPasswordResetCode(model.PasswordResetCode);

            if (user == null) throw new ArgumentException("Invalid Password Reset Code");
            user.PasswordHash = HashUtility.HashPassword(model.Password);
            user.PasswordResetCode = ""; //blank the one time reset code after a successful password change
            user.Password = ""; //blank plain text password just in case
            return _repo.Update(user);
        }

        private string GeneratePasswordLinkCode()
        {
            return Guid.NewGuid().ToString();
        }
    }
}
