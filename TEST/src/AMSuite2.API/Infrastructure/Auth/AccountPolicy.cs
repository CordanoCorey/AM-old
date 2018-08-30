using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;

namespace AMSuite2.API.Infrastructure.Auth
{
    public class AccountHandler : AuthorizationHandler<IAuthorizationRequirement>
    {
        private readonly IAuthRepository _authRepository;
        public AccountHandler(IAuthRepository authRepository)
        {
            _authRepository = authRepository;
        }
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, IAuthorizationRequirement requirement)
        {
            var mvcContext = context.Resource as Microsoft.AspNetCore.Mvc.Filters.AuthorizationFilterContext;
            var request = mvcContext.HttpContext.Request;
            //Get accountId from the querystring in the url
            var accountId = request.Query.SingleOrDefault(x => x.Key == "accountId").Value;
            //Get userId from the token.
            var userId = context.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier).Value;
            var readonlyAccess = request.Method == "GET";

            if (_authRepository.HasAccessToAccount(long.Parse(userId), long.Parse(accountId), readonlyAccess)) context.Succeed(requirement);

            return Task.CompletedTask;
        }
    }

    public class AccountRequirement : IAuthorizationRequirement
    {
        
    }
}
