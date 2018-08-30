using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;

namespace AMSuite2.API.Infrastructure.Auth
{
    public class MeetingHandler : AuthorizationHandler<IAuthorizationRequirement>
    {
        private readonly IAuthRepository _authRepository;

        public MeetingHandler(IAuthRepository authRepository)
        {
            _authRepository = authRepository;
        }

        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context,
            IAuthorizationRequirement requirement)
        {
            var mvcContext = context.Resource as Microsoft.AspNetCore.Mvc.Filters.AuthorizationFilterContext;
            var request = mvcContext.HttpContext.Request;
            //Get accountId from the querystring in the url
            var meetingId = mvcContext.RouteData.Values["id"].ToString();
            //Get userId from the token.
            var userId = context.User.Claims.SingleOrDefault(x => x.Type == ClaimTypes.NameIdentifier).Value;
            var readonlyAccess = request.Method == "GET";

            if (_authRepository.HasAccessToAccount(long.Parse(userId), long.Parse(meetingId), readonlyAccess)) context.Succeed(requirement);

            return Task.CompletedTask;
        }
    }
}
