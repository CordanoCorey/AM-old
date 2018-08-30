using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AMSuite2.API.Features.Core.Accounts;
using AMSuite2.API.Infrastructure.Models;

namespace AMSuite2.API.Features.Core.AccountLogo
{
    public class AccountLogoModel : BaseEntity, IEntity
    {
        public int Id { get; set; }
        public int AccountId { get; set; }
        public byte[] FileBinary { get; set; }
        public string FileExtension { get; set; }
        public string FileName { get; set; }
        public long FileSize { get; set; }
        public string MimeType { get; set; }

        public AccountModel Account { get; set; }
    }
}
