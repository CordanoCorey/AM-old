using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AMSuite2.Entities.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;

namespace AMSuite2.Entities
{
    public class MigrationsContextFactory : IDbContextFactory<AMSuiteContext>
    {
        private DbContextOptions<AMSuiteContext> _options;

        public MigrationsContextFactory(DbContextOptions<AMSuiteContext> options)
        {
            _options = options;
        }

        public MigrationsContextFactory()
        {
        }

        public AMSuiteContext Create()
        {
            return new AMSuiteContext(_options);
        }

        public AMSuiteContext Create(DbContextFactoryOptions options)
        {
            return new AMSuiteContext();
        }
    }
}
