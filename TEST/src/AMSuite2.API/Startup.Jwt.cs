using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using AMSuite2.API.Infrastructure.Auth;

namespace AMSuite2.API
{
    public partial class Startup
    {

        public static void ConfigureJwtServices(IServiceCollection services)
        {
            services.AddAuthorization(options =>
            {
            });
        }

        public static void ConfigureJwt(IApplicationBuilder app, IHostingEnvironment env, IConfiguration config)
        {
            // Add JWT generation endpoint:
            var secretKey = config["Auth:SimpleJwt:Secret"];
            var signingKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(secretKey));
            var signCreds = new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256);
            var options = new TokenProviderOptions
            {
                Path = "/api/token",
                Audience = config["Auth:SimpleJwt:Audience"],
                Issuer = config["Auth:SimpleJwt:Issuer"],
                SigningCredentials = signCreds,
                Expiration = TimeSpan.FromDays(30)
            };
            app.UseSimpleTokenProvider(options);
            var tokenValidationParameters = new TokenValidationParameters
            {
                // The signing key must match!
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = signingKey,

                // Validate the JWT Issuer (iss) claim
                ValidateIssuer = true,
                ValidIssuer = config["Auth:SimpleJwt:Issuer"],

                // Validate the JWT Audience (aud) claim
                ValidateAudience = true,
                ValidAudience = config["Auth:SimpleJwt:Audience"],

                // Validate the token expiry
                ValidateLifetime = true,

                // If you want to allow a certain amount of clock drift, set that here:
                ClockSkew = TimeSpan.Zero
            };

            app.UseJwtBearerAuthentication(new JwtBearerOptions
            {
                AutomaticAuthenticate = true,
                AutomaticChallenge = true,
                Events = new JwtBearerEvents
                {
                    OnChallenge = context =>
                    {
                        context.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
                        context.HandleResponse();
                        return Task.FromResult(0);
                    },
                },
                TokenValidationParameters = tokenValidationParameters
            });
        }
    }
}
