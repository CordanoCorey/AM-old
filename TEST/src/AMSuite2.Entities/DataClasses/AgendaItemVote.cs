using System;
using System.Collections.Generic;
using AMSuite2.Entities.Identity;

namespace AMSuite2.Entities.DataClasses
{
    public partial class AgendaItemVote
    {
        public int Id { get; set; }
        public int VoteAnswerId { get; set; }
        public int VoterId { get; set; }
        public int AgendaItemId { get; set; }
        public int CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; }
        public int LastModifiedBy { get; set; }
        public DateTime LastModifiedOn { get; set; }

        public virtual AgendaItemData AgendaItem { get; set; }
        public virtual ApplicationUser CreatedByNavigation { get; set; }
        public virtual ApplicationUser LastModifiedByNavigation { get; set; }
        public virtual VoteAnswerLkp VoteAnswer { get; set; }
        public virtual ApplicationUser Voter { get; set; }
    }
}
