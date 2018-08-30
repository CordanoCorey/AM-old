using System;
using System.Collections.Generic;
using AMSuite2.Entities.Identity;

namespace AMSuite2.Entities.DataClasses
{
    public partial class AccountLogo
    {
        public int Id { get; set; }
        public int AccountId { get; set; }
        public string FileName { get; set; }
        public long FileSize { get; set; }
        public byte[] FileBinary { get; set; }
        public string FileExtension { get; set; }
        public string MimeType { get; set; }
        public int CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; }

        public virtual Account Account { get; set; }
        public virtual ApplicationUser CreatedByNavigation { get; set; }
    }
}
