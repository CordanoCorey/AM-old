using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AMSuite2.Entities.Context;
using AMSuite2.Entities.DataClasses;
using AMSuite2.Files.DataClasses;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;

namespace AMSuite2.API
{
    public partial class Startup
    {
        public static void ConfigureOrmServices(IServiceCollection services, IConfiguration config)
        {
            services.AddEntityFrameworkSqlServer();

            services.AddDbContext<AMSuiteContext>(options =>
            {
                options.UseSqlServer(config["connectionStrings:amsuite"]);
            });

            services.AddDbContext<AMSuiteFilesContext>(options =>
            {
                options.UseSqlServer(config["connectionStrings:amsuiteFiles"]);
            });
        }

        public static void ConfigureOrm(IApplicationBuilder app, IHostingEnvironment env)
        {

        }
    }
}
