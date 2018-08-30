using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AMSuite2.API.Infrastructure.Auth;
using AMSuite2.Entities.Context;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using AMSuite2.Entities.DataClasses;
using AMSuite2.Entities.Identity;
using Microsoft.AspNetCore.Authorization;

namespace AMSuite2.API
{
    public partial class Startup
    {
        public static void ConfigureAuthServices(IServiceCollection services)
        {
            services.AddIdentity<ApplicationUser, ApplicationRole>()
                    .AddEntityFrameworkStores<AMSuiteContext, int>()
                    .AddDefaultTokenProviders();

            services.Configure<IdentityOptions>(opts =>
            {
                opts.Password.RequireDigit = true;
                opts.Password.RequiredLength = 8;
                opts.Password.RequireNonAlphanumeric = false;
                opts.Password.RequireUppercase = false;
                opts.Password.RequireLowercase = false;
                opts.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(30);
                opts.Lockout.MaxFailedAccessAttempts = 30;

                opts.User.RequireUniqueEmail = true;
            });


            services.AddAuthorization(options =>
            {
                options.AddPolicy("Account",
                                  policy => policy.Requirements.Add(new AccountRequirement()));
            });

            services.AddSingleton<IAuthorizationHandler, AccountHandler>();
        }

        public static void ConfigureAuth(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory, IConfigurationRoot config)
        {
            //app.UseCookieAuthentication(new CookieAuthenticationOptions
            //{
            //    AutomaticChallenge = true,
            //    AuthenticationScheme = "Cookies"
            //});

            app.UseIdentity();
        }

        public static bool IsPropertyTrue(string property)
        {
            return property.ToLower() == "true";
        }
    }
}
