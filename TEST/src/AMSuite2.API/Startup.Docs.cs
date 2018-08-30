using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Swashbuckle.Swagger.Model;

namespace AMSuite2.API
{
    public partial class Startup
    {
        public static void ConfigureSwaggerServices(IServiceCollection services, IConfigurationRoot config)
        {
            //var pathToDoc = config["Swagger:Path"];
            services.AddSwaggerGen(options =>
            {
                options.SingleApiVersion(new Info
                {
                    Version = "v1",
                    Title = "AM Suite API",
                    Description = "Student Services Referral Data System",
                    TermsOfService = "None",
                    //Contact = new Contact
                    //{
                    //    Email = "rbrown@caiu.org",
                    //    Name = "Royce Brown",
                    //    Url = "www.caiu.org"
                    //}
                });
                //options.IncludeXmlComments(Path.Combine(env.ContentRootPath, pathToDoc));
                options.DescribeAllEnumsAsStrings();
            });
        }

        public static void ConfigureSwagger(IApplicationBuilder app, IHostingEnvironment env)
        {
            app.UseSwagger();
            app.UseSwaggerUi();
        }
    }
}
