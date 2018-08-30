using System;
using System.Collections.Generic;
using AMSuite2.Entities.Identity;

namespace AMSuite2.Entities.DataClasses
{
    public partial class BinAgendaItemData
    {
        public BinAgendaItemData()
        {
            BinAgendaRecord = new HashSet<BinAgendaRecord>();
            BinAttachment = new HashSet<BinAttachment>();
        }

        public int Id { get; set; }
        public int UserId { get; set; }
        public string AgendaItemName { get; set; }
        public string AgendaItemDescription { get; set; }
        public int DisplayOrder { get; set; }
        public bool? IsVotable { get; set; }
        public int StatusId { get; set; }
        public int? ParentItemId { get; set; }
        public bool Suggestion { get; set; }
        public int? AccountId { get; set; }

        public virtual ICollection<BinAgendaRecord> BinAgendaRecord { get; set; }
        public virtual ICollection<BinAttachment> BinAttachment { get; set; }
        public virtual Account Account { get; set; }
        public virtual BinAgendaItemData ParentItem { get; set; }
        public virtual ICollection<BinAgendaItemData> InverseParentItem { get; set; }
        public virtual StatusLkp Status { get; set; }
        public virtual ApplicationUser User { get; set; }
    }
}
