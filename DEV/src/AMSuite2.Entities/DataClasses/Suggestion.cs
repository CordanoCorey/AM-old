using System;
using System.Collections.Generic;
using AMSuite2.Entities.Identity;

namespace AMSuite2.Entities.DataClasses
{
    public partial class Suggestion
    {
        public Suggestion()
        {
            SuggestionAttachmentXref = new HashSet<SuggestionAttachmentXref>();
        }

        public int Id { get; set; }
        public int AgendaId { get; set; }
        public string SuggestionName { get; set; }
        public string SuggestionDescription { get; set; }
        public DateTime CreatedDate { get; set; }
        public int CreatedBy { get; set; }
        public DateTime LastModifiedDate { get; set; }
        public int LastModifiedBy { get; set; }

        public virtual ICollection<SuggestionAttachmentXref> SuggestionAttachmentXref { get; set; }
        public virtual Agenda Agenda { get; set; }
        public virtual ApplicationUser CreatedByNavigation { get; set; }
        public virtual ApplicationUser LastModifiedByNavigation { get; set; }
    }
}
