using System;
using System.Collections.Generic;

namespace AMSuite2.Entities.DataClasses
{
    public partial class VoteAnswerLkp
    {
        public VoteAnswerLkp()
        {
            AgendaItemVote = new HashSet<AgendaItemVote>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public bool IsActive { get; set; }
        public string EnumCode { get; set; }

        public virtual ICollection<AgendaItemVote> AgendaItemVote { get; set; }
    }
}
