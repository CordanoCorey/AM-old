using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using AMSuite2.API.Infrastructure.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Http;

namespace AMSuite2.API
{
    public partial class Startup
    {
        public static void ConfigureErrorHandlingServices(IServiceCollection services)
        {

        }

        public static void ConfigureErrorHandling(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            app.UseExceptionHandler(builder =>
            {
                builder.Run(async context =>
                {
                    context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                    context.Response.ContentType = "application/json";
                    //UseExceptionHandler calls clear on Response.Headers which removes our CORS headers.
                    context.Response.Headers.Add("Access-Control-Allow-Origin", "*");
                    context.Response.Headers.Add("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

                    var error = context.Features.Get<Microsoft.AspNetCore.Diagnostics.IExceptionHandlerFeature>();
                    if (error != null)
                    {
                        await context.Response.WriteAsync(new ErrorResponse { StatusCode = (int)HttpStatusCode.InternalServerError, Message = "An error has occured in the api. ERROR:" + error.Error.Message + " STACK TRACE: " + error.Error.StackTrace}.ToString()).ConfigureAwait(false);
                    }
                });
            });
        }
    }
}
