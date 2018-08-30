using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using AMSuite2.API.Features.AgendaManager.BinItems;
using AMSuite2.API.Features.AgendaManager.Meetings;
using AMSuite2.API.Features.Core.AccountLogo;
using AMSuite2.API.Features.Core.AccountMembers;
using AMSuite2.API.Features.Core.Announcements;
using AMSuite2.API.Features.Core.Groups;
using AMSuite2.API.Features.Core.Notifications;
using AMSuite2.API.Features.Core.Users;

namespace AMSuite2.API.Features.Core.Accounts
{
    public class AccountModel
    {
        public int Id { get; set; }
        public bool? AllowRequests { get; set; }
        public string DefaultSignature { get; set; }
        public string Description { get; set; }
        public string EmailAgendaTemplate { get; set; }
        public string EmailTemplate { get; set; }
        public Guid? MemberContentSourceId { get; set; }
        public string Name { get; set; }
        public int OwnerId { get; set; }
        public Guid? PublicContentSourceId { get; set; }
        public string Status { get; set; }
        public int StatusId { get; set; }
        public DateTime? TrialPeriodStartDate { get; set; }
        public DateTime? TrialPeriodEndDate { get; set; }
        public string Url { get; set; }
        
        public AccountMemberModel Administrator { get; set; }
        public IEnumerable<AnnouncementModel> Announcements { get; set; }
        public IEnumerable<BinItemModel> BinItems { get; set; }
        public IEnumerable<GroupModel> Groups { get; set; }
        public AccountLogoModel Logo { get; set; }
        public IEnumerable<MeetingModel> Meetings { get; set; }
        public IEnumerable<AccountMemberModel> Members { get; set; }
        public IEnumerable<NotificationModel> Notifications { get; set; }
        public UserModel Owner { get; set; }
    }
}
