using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AMSuite2.API.Infrastructure.Models;

namespace AMSuite2.API.Infrastructure.Auth
{
    public class LoggedInUserModel
    {
        public string access_token { get; set; }
        public int expires_in { get; set; }
        public CurrentUserModel user { get; set; }
    }
}
