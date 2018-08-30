using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AMSuite2.Entities.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace AMSuite2.Entities.Context
{
    public partial class AMSuiteContext : IdentityDbContext<ApplicationUser, ApplicationRole, int>
    {

        public void OnModelCreating_Identity(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ApplicationUser>(e =>
            {
                e.ToTable("User");
            });

            modelBuilder.Entity<ApplicationRole>(e =>
            {
                e.ToTable("AspNetRoles");
                e.HasKey(x => new { x.Id });
            });
        }
    }
}
