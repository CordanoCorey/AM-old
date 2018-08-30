using System;
using System.Collections.Generic;
using AMSuite2.Entities.Identity;

namespace AMSuite2.Entities.DataClasses
{
    public partial class AgendaItemData
    {
        public AgendaItemData()
        {
            AgendaItemVote = new HashSet<AgendaItemVote>();
            AgendaRecord = new HashSet<AgendaRecord>();
            Attachment = new HashSet<Attachment>();
            NotificationSuggestedItemXref = new HashSet<NotificationSuggestedItemXref>();
        }

        public int Id { get; set; }
        public int AgendaId { get; set; }
        public string AgendaItemName { get; set; }
        public string AgendaItemDescription { get; set; }
        public int DisplayOrder { get; set; }
        public bool? IsVotable { get; set; }
        public int StatusId { get; set; }
        public DateTime CreatedDate { get; set; }
        public int CreatedBy { get; set; }
        public DateTime LastModifiedDate { get; set; }
        public int LastModifiedBy { get; set; }
        public int? ParentItemId { get; set; }
        public bool Suggestion { get; set; }

        public virtual ICollection<AgendaItemVote> AgendaItemVote { get; set; }
        public virtual ICollection<AgendaRecord> AgendaRecord { get; set; }
        public virtual ICollection<Attachment> Attachment { get; set; }
        public virtual ICollection<NotificationSuggestedItemXref> NotificationSuggestedItemXref { get; set; }
        public virtual Agenda Agenda { get; set; }
        public virtual ApplicationUser CreatedByNavigation { get; set; }
        public virtual ApplicationUser LastModifiedByNavigation { get; set; }
        public virtual AgendaItemData ParentItem { get; set; }
        public virtual ICollection<AgendaItemData> InverseParentItem { get; set; }
        public virtual StatusLkp Status { get; set; }
    }
}
