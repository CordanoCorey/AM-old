using AMSuite2.Entities.DataClasses;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AMSuite2.API.Infrastructure.Lookup
{
    public class LookupContext
    {
        public DbSet<AccountStatusLkp> AccountStatuses { get; set; }
        public DbSet<AgendaLkp> Agendas { get; set; }
        public DbSet<AgendaDateRangeLkp> DateRanges { get; set; }
        public DbSet<GroupRoleLkp> GroupRoles { get; set; }
        public DbSet<NotificationStatusLkp> NotificationStatuses { get; set; }
        public DbSet<NotificationTypeLkp> NotificationTypes { get; set; }
        public DbSet<OutlineLkp> Outlines { get; set; }
        public DbSet<RoleLkp> UserRoles { get; set; }
        public DbSet<VoteAnswerLkp> VoteAnswers { get; set; }

    }

    public class LookupModel
    {
        public string Key { get; set; }
        public string Expires { get; set; }
        public IEnumerable<LookupValueModel> Values { get; set; } = new List<LookupValueModel>();
    }

    public class LookupValueModel
    {
        public int Id { get; set; } = 0;
        public string Name { get; set; }
        public string Description { get; set; }
        public bool Active { get; set; } = true;
    }
}
