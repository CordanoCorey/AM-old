using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AMSuite2.API.Infrastructure.Models;

namespace AMSuite2.API.Features.AgendaManager.Votes
{
    public class VoteModel : BaseEntity, IEntity
    {
        public int Id { get; set; }
        public int AgendaItemId { get; set; }
        public string Answer { get; set; }
        public int AnswerId { get; set; }
        public string FullName { get; set; }
        public int VoterId { get; set; }
        public string VoterName { get; set; }
        public bool? VoterIsAbsent { get; set; }
    }
}
