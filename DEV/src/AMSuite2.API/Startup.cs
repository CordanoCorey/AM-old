using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using AutoMapper;
using AMSuite2.API.Infrastructure.Mapper;

namespace AMSuite2.API
{
    public partial class Startup
    {
        private MapperConfiguration _mapperConfiguration { get; set; }
        private const string CORS_ALLOW_ALL = "CORS_ALLOW_ALL";

        public Startup(IHostingEnvironment env)
        {
            //Set up AutoMapper
            _mapperConfiguration = new MapperConfiguration(config =>
            {
                config.AddProfile(new AutoMapperConfiguration());
                config.AddProfile(new CurrentUserMapProfile());
                config.AddProfile(new LookupMapProfile());
                config.AddProfile(new AccountLogoMapProfile());
                config.AddProfile(new AccountMemberMapProfile());
                config.AddProfile(new AccountRequestMapProfile());
                config.AddProfile(new AccountMapProfile());
                config.AddProfile(new AgendaItemMapProfile());
                config.AddProfile(new AgendaMapProfile());
                config.AddProfile(new AnnouncementAttachmentMapProfile());
                config.AddProfile(new AnnouncementMapProfile());
                config.AddProfile(new AttachmentMapProfile());
                config.AddProfile(new AttendanceMapProfile());
                config.AddProfile(new BinItemMapProfile());
                config.AddProfile(new BinItemAttachmentMapProfile());
                config.AddProfile(new DashboardMapProfile());
                config.AddProfile(new EmailMapProfile());
                config.AddProfile(new EmailAttachmentMapProfile());
                config.AddProfile(new GroupMapProfile());
                config.AddProfile(new GroupMemberMapProfile());
                config.AddProfile(new MeetingMapProfile());
                config.AddProfile(new MinutesMapProfile());
                config.AddProfile(new NotesMapProfile());
                config.AddProfile(new NotificationMapProfile());
                config.AddProfile(new ProfileMapProfile());
                config.AddProfile(new SuggestionMapProfile());
                config.AddProfile(new TemplateItemMapProfile());
                config.AddProfile(new TemplateMapProfile());
                config.AddProfile(new UserMapProfile());
                config.AddProfile(new VotesMapProfile());
            });

            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddJsonFile("localConnectionStrings.json", optional: true);

            if (env.IsEnvironment("Development"))
            {
                //dev specific things
            }

            builder.AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit http://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddScoped<IConfigurationRoot>(x => Configuration);

            //Cross-origin Resource Sharing
            //Browsers will shut down POSTs across domains if preflight doesn't work.
            //https://en.wikipedia.org/wiki/Cross-origin_resource_sharing#Simple_example
            ConfigureCorsServices(services);

            ConfigureOrmServices(services, Configuration);

            services.AddMvc();

            ConfigureJwtServices(services);

            //Identity/IdentityServer/Token generation.
            ConfigureAuthServices(services);

            ConfigureSwaggerServices(services, Configuration);

            // Singleton services
            services.AddSingleton(sp => _mapperConfiguration.CreateMapper());

            //Transient Services
            ConfigureTransientServices(services);

            //Scoped Services
            ConfigureScopedServices(services);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

            ConfigureCors(app, env);

            ConfigureOrm(app, env);

            ConfigureErrorHandling(app, env, loggerFactory);

            ConfigureAuth(app, env, loggerFactory, Configuration);

            ConfigureJwt(app, env, Configuration);

            app.UseMvc();

            ConfigureSwagger(app, env);
        }
    }
}
