using System;
using System.Collections.Generic;
using AMSuite2.Entities.Identity;

namespace AMSuite2.Entities.DataClasses
{
    public partial class AgendaRecord
    {
        public int Id { get; set; }
        public int AgendaRecordTypeId { get; set; }
        public int AgendaItemId { get; set; }
        public string AgendaRecord1 { get; set; }
        public int Createdby { get; set; }
        public DateTime CreatedDate { get; set; }
        public int? LastModifiedBy { get; set; }
        public DateTime? LastModifiedDate { get; set; }

        public virtual AgendaItemData AgendaItem { get; set; }
        public virtual AgendaRecordLkp AgendaRecordType { get; set; }
        public virtual ApplicationUser CreatedbyNavigation { get; set; }
        public virtual ApplicationUser LastModifiedByNavigation { get; set; }
    }
}
