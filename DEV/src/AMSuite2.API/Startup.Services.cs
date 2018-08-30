using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AMSuite2.API.Features.AgendaManager.AgendaItems;
using AMSuite2.API.Features.AgendaManager.Agendas;
using AMSuite2.API.Features.AgendaManager.Attendance;
using AMSuite2.API.Features.AgendaManager.BinItems;
using AMSuite2.API.Features.AgendaManager.Meetings;
using AMSuite2.API.Features.AgendaManager.Minutes;
using AMSuite2.API.Features.AgendaManager.Notes;
using AMSuite2.API.Features.AgendaManager.Suggestions;
using AMSuite2.API.Features.AgendaManager.TemplateItems;
using AMSuite2.API.Features.AgendaManager.Templates;
using AMSuite2.API.Features.AgendaManager.Votes;
using AMSuite2.API.Features.Core.AccountLogo;
using Microsoft.Extensions.DependencyInjection;
using AMSuite2.API.Features.Core.AccountMembers;
using AMSuite2.API.Features.Core.AccountRequests;
using AMSuite2.API.Features.Core.Accounts;
using AMSuite2.API.Features.Core.Announcements;
using AMSuite2.API.Features.Core.Dashboard;
using AMSuite2.API.Features.Core.Email;
using AMSuite2.API.Features.Core.GroupMembers;
using AMSuite2.API.Features.Core.Groups;
using AMSuite2.API.Features.Core.Login;
using AMSuite2.API.Features.Core.Notifications;
using AMSuite2.API.Features.Core.Profile;
using AMSuite2.API.Features.Core.Search;
using AMSuite2.API.Features.Core.Users;
using AMSuite2.API.Features.DocumentManager.AnnouncementAttachments;
using AMSuite2.API.Features.DocumentManager.Attachments;
using AMSuite2.API.Features.DocumentManager.EmailAttachments;
using AMSuite2.API.Features.DocumentManager.Files;
using AMSuite2.API.Infrastructure.Auth;
using AMSuite2.API.Infrastructure.Lookup;
using AMSuite2.API.Infrastructure.Services;
using AMSuite2.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace AMSuite2.API
{
    public partial class Startup
    {
        public static void ConfigureTransientServices(IServiceCollection services)
        {
            services.AddTransient<IFileReader, FileReader>();
        }

        public static void ConfigureScopedServices(IServiceCollection services)
        {
            services.AddScoped<ITokenProviderService, TokenProviderService>();

            //Account Logo
            services.AddScoped<IAccountLogoService, AccountLogoService>();
            services.AddScoped<IAccountLogoRepository, AccountLogoRepository>();

            //Account Members
            services.AddScoped<IAccountMembersService, AccountMembersService>();
            services.AddScoped<IAccountMembersRepository, AccountMembersRepository>();

            //Account Request Notifications
            services.AddScoped<IAccountRequestsService, AccountRequestsService>();
            services.AddScoped<IAccountRequestsRepository, AccountRequestsRepository>();

            //Accounts
            services.AddScoped<IAccountsService, AccountsService>();
            services.AddScoped<IAccountsRepository, AccountsRepository>();

            //Agenda Items
            services.AddScoped<IAgendaItemsService, AgendaItemsService>();
            services.AddScoped<IAgendaItemsRepository, AgendaItemsRepository>();

            //Agendas
            services.AddScoped<IAgendasService, AgendasService>();
            services.AddScoped<IAgendasRepository, AgendasRepository>();

            //Announcement Attachments
            services.AddScoped<IAnnouncementAttachmentsService, AnnouncementAttachmentsService>();
            services.AddScoped<IAnnouncementAttachmentsRepository, AnnouncementAttachmentsRepository>();

            //Announcements
            services.AddScoped<IAnnouncementsService, AnnouncementsService>();
            services.AddScoped<IAnnouncementsRepository, AnnouncementsRepository>();

            //Attachments
            services.AddScoped<IAttachmentsService, AttachmentsService>();
            services.AddScoped<IAttachmentsRepository, AttachmentsRepository>();

            //Attendance
            services.AddScoped<IAttendanceService, AttendanceService>();
            services.AddScoped<IAttendanceRepository, AttendanceRepository>();

            //Bin Items
            services.AddScoped<IBinItemsService, BinItemsService>();
            services.AddScoped<IBinItemsRepository, BinItemsRepository>();

            //Dashboard
            services.AddScoped<IDashboardService, DashboardService>();
            services.AddScoped<IDashboardRepository, DashboardRepository>();

            //Email
            services.AddScoped<IEmailService, EmailService>();
            services.AddScoped<IEmailRepository, EmailRepository>();

            //Email Attachments
            services.AddScoped<IEmailAttachmentsService, EmailAttachmentsService>();
            services.AddScoped<IEmailAttachmentsRepository, EmailAttachmentsRepository>();

            //Files
            services.AddScoped<IFilesService, FilesService>();
            services.AddScoped<IFilesRepository, FilesRepository>();

            //Group Members
            services.AddScoped<IGroupMembersService, GroupMembersService>();
            services.AddScoped<IGroupMembersRepository, GroupMembersRepository>();

            //Groups
            services.AddScoped<IGroupsService, GroupsService>();
            services.AddScoped<IGroupsRepository, GroupsRepository>();

            //Login
            services.AddScoped<ILoginService, LoginService>();
            services.AddScoped<ILoginRepository, LoginRepository>();

            //Lookup
            services.AddScoped<ILookupService, LookupService>();
            services.AddScoped<ILookupRepository, LookupRepository>();

            //Meetings
            services.AddScoped<IMeetingsService, MeetingsService>();
            services.AddScoped<IMeetingsRepository, MeetingsRepository>();

            //Minutes
            services.AddScoped<IMinutesService, MinutesService>();
            services.AddScoped<IMinutesRepository, MinutesRepository>();
            services.AddScoped<IBinMinutesRepository, BinMinutesRepository>();

            //Notes
            services.AddScoped<INotesService, NotesService>();
            services.AddScoped<INotesRepository, NotesRepository>();
            services.AddScoped<IBinNotesRepository, BinNotesRepository>();

            //Notifications
            services.AddScoped<INotificationsService, NotificationsService>();
            services.AddScoped<INotificationsRepository, NotificationsRepository>();

            //Profile
            services.AddScoped<IProfileService, ProfileService>();

            //Search
            services.AddScoped<ISearchService, SearchService>();

            //Suggestions
            services.AddScoped<ISuggestionsService, SuggestionsService>();
            services.AddScoped<ISuggestionsRepository, SuggestionsRepository>();

            //TemplateItems
            services.AddScoped<ITemplatesService, TemplatesService>();
            services.AddScoped<ITemplatesRepository, TemplatesRepository>();

            //Templates
            services.AddScoped<ITemplateItemsService, TemplateItemsService>();
            services.AddScoped<ITemplateItemsRepository, TemplateItemsRepository>();

            //Users
            services.AddScoped<IUsersService, UsersService>();
            services.AddScoped<IUsersRepository, UsersRepository>();

            //Votes
            services.AddScoped<IVotesService, VotesService>();
            services.AddScoped<IVotesRepository, VotesRepository>();

            services.AddScoped<IPasswordHasher<ApplicationUser>, AMSuite2.API.Infrastructure.Auth.HashUtility>();

            services.AddScoped<IAuthRepository, AuthRepository>();
        }
    }
}
