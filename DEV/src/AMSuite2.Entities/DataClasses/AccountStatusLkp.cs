using System;
using System.Collections.Generic;

namespace AMSuite2.Entities.DataClasses
{
    public partial class AccountStatusLkp
    {
        public AccountStatusLkp()
        {
            Account = new HashSet<Account>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string EnumCode { get; set; }

        public virtual ICollection<Account> Account { get; set; }
    }
}
