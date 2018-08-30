using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AMSuite2.API.Infrastructure.Models;

namespace AMSuite2.API.Features.AgendaManager.Votes
{
    public class VotesModel
    {
        public int TotalNay { get; set; }
        public int TotalYea { get; set; }
        public int TotalAbstain { get; set; }
        public int TotalNotCast { get; set; }
        public bool Voted { get; set; }
        public IEnumerable<VoteModel> Votes { get; set; }
    }
    public class AgendaVotesModel : VotesModel
    {
        public int AgendaId { get; set; }
    }

    public class AgendaItemVotesModel : VotesModel
    {
        public int AgendaItemId { get; set; }
    }
}
