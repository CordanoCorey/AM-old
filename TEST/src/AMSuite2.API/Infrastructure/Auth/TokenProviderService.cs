using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Threading.Tasks;
using AMSuite2.API.Features.Core.GroupMembers;
using AMSuite2.API.Features.Core.Users;
using AMSuite2.API.Infrastructure.Models;
using Microsoft.AspNetCore.Identity;
using AMSuite2.Entities.Identity;
using AutoMapper;

namespace AMSuite2.API.Infrastructure.Auth
{

    public interface ITokenProviderService
    {
        Task<LoggedInUserModel> GetLoggedInUser(string email, TokenProviderOptions options);
    }

    public class TokenProviderService : ITokenProviderService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IMapper _mapper;
        private readonly IUsersRepository _usersRepository;
        private readonly IGroupMembersRepository _groupMembersRepository;

        public TokenProviderService(
            UserManager<ApplicationUser> um,
            IMapper mapper,
            IUsersRepository usersRepository,
            IGroupMembersRepository groupMembersRepository)
        {
            _userManager = um;
            _mapper = mapper;
            _usersRepository = usersRepository;
            _groupMembersRepository = groupMembersRepository;
        }

        private async Task<IEnumerable<Claim>> GenerateClaims(string username, int userid, DateTime dt, TokenProviderOptions options)
        {
            // Specifically add the jti (nonce), iat (issued timestamp), and sub (subject/user) claims.
            // You can add other claims here, if you want:
            var jwtclaims = new Claim[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, userid.ToString()),
                new Claim(JwtRegisteredClaimNames.UniqueName, username),
                new Claim(JwtRegisteredClaimNames.Jti, await options.NonceGenerator()),
                new Claim(JwtRegisteredClaimNames.Iat, ToUnixEpochDate(dt).ToString(), ClaimValueTypes.Integer64)
            };

            return jwtclaims;
        }

        /// <summary>
        /// Get this datetime as a Unix epoch timestamp (seconds since Jan 1, 1970, midnight UTC).
        /// </summary>
        /// <param name="date">The date to convert.</param>
        /// <returns>Seconds since Unix epoch.</returns>
        public static long ToUnixEpochDate(DateTime date)
            => (long)Math.Round((date.ToUniversalTime() - new DateTimeOffset(1970, 1, 1, 0, 0, 0, TimeSpan.Zero)).TotalSeconds);


        public async Task<LoggedInUserModel> GetLoggedInUser(string email, TokenProviderOptions options)
        {
            List<Claim> userclaims = new List<Claim>();
            var user = await _userManager.FindByEmailAsync(email);
            var userRoles = _usersRepository.GetUserAccounts(user.Id);
            var userGroupRoles = _groupMembersRepository.FindByUser(user.Id);
            var umClaims = await _userManager.GetClaimsAsync(user);
            var now = DateTime.UtcNow;
            var jwtclaims = await GenerateClaims(email, user.Id, now, options);
            userclaims.AddRange(umClaims);
            userclaims.AddRange(jwtclaims);

            // Create the JWT and write it to a string
            var jwt = new JwtSecurityToken(
                issuer: options.Issuer,
                audience: options.Audience,
                claims: userclaims,
                notBefore: now,
                expires: now.Add(options.Expiration),
                signingCredentials: options.SigningCredentials);


            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);
            var response = new LoggedInUserModel()
            {
                access_token = encodedJwt,
                expires_in = (int)options.Expiration.TotalSeconds,
                user = _mapper.Map<CurrentUserModel>(user)
            };

            response.user.UserAccounts = userRoles;
            response.user.UserGroups = userGroupRoles;

            return response;
        }
    }
}
