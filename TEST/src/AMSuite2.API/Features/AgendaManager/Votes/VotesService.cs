using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata.Ecma335;
using System.Threading.Tasks;
using AMSuite2.API.Infrastructure.Models;

namespace AMSuite2.API.Features.AgendaManager.Votes
{
    public interface IVotesService
    {
        SearchResults<VoteModel> GetVotes(QueryModel<VoteModel> query);
        VoteModel GetVote(int id);
        VoteModel AddVote(VoteModel model);
        VoteModel UpdateVote(VoteModel model);
        void DeleteVote(int id);
        IEnumerable<VoteModel> UpdateVotes(IEnumerable<VoteModel> model);
        IEnumerable<VoteModel> GetAgendaVotes(int agendaId);
        IEnumerable<VoteModel> GetAgendaItemVotes(int agendaItemId);
        void DeleteAgendaItemVotes(int agendaItemId);
        IEnumerable<VoteModel> SaveAgendaItemVotes(int agendaItemId, IEnumerable<VoteModel> model);
    }
    public class VotesService : IVotesService
    {
        private readonly IVotesRepository _repo;

        public VotesService(IVotesRepository repo)
        {
            _repo = repo;
        }

        public VoteModel AddVote(VoteModel model)
        {
            return _repo.Insert(model);
        }

        public void DeleteVote(int id)
        {
            _repo.Delete(id);
        }

        public VoteModel GetVote(int id)
        {
            return _repo.FindByKey(id);
        }

        public VoteModel UpdateVote(VoteModel model)
        {
            return _repo.Update(model);
        }

        public SearchResults<VoteModel> GetVotes(QueryModel<VoteModel> query)
        {
            var results = query.IsNullOrDefault ? _repo.All() : _repo.FindBy(query);
            return new SearchResults<VoteModel>()
            {
                Results = results
            };
        }

        public IEnumerable<VoteModel> UpdateVotes(IEnumerable<VoteModel> votes)
        {
            return _repo.Update(votes);
        }

        public IEnumerable<VoteModel> GetAgendaVotes(int agendaId)
        {
            return _repo.FindByAgenda(agendaId);
        }

        public IEnumerable<VoteModel> GetAgendaItemVotes(int agendaItemId)
        {
            return _repo.FindByAgendaItem(agendaItemId);
        }

        public void DeleteAgendaItemVotes(int agendaItemId)
        {
            var votes = GetAgendaItemVotes(agendaItemId);
            var ids = votes.Select(x => x.Id);
            _repo.Delete(ids);
        }

        public IEnumerable<VoteModel> SaveAgendaItemVotes(int agendaItemId, IEnumerable<VoteModel> model)
        {
            DeleteAgendaItemVotes(agendaItemId);
            _repo.Insert(model);
            return GetAgendaItemVotes(agendaItemId);
        }
    }
}
