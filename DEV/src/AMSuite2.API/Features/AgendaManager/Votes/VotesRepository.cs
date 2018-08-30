using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AMSuite2.API.Infrastructure.Repositories;
using AMSuite2.Entities.Context;
using AMSuite2.Entities.DataClasses;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace AMSuite2.API.Features.AgendaManager.Votes
{
    public interface IVotesRepository : IBaseRepository<AgendaItemVote, VoteModel>
    {
        IEnumerable<VoteModel> FindByAgenda(int agendaId);
        IEnumerable<VoteModel> FindByAgenda(int agendaId, int userId);
        IEnumerable<VoteModel> FindByAgendaItem(int agendaItemId);
        VoteModel FindByAgendaItem(int agendaItemId, int userId);
    }

    public class VotesRepository : BaseRepository<AgendaItemVote, VoteModel>, IVotesRepository
    {
        public VotesRepository(AMSuiteContext context, IMapper mapper) : base(context, mapper)
        {
        }

        public IEnumerable<VoteModel> FindByAgenda(int agendaId)
        {
            var results = DbSet
                .Join(_context.AgendaItemData.Where(y => y.AgendaId == agendaId),
                    x => x.AgendaItemId,
                    y => y.Id,
                    (x, y) => x
                ).ToList();
            return Map(results);
        }

        public IEnumerable<VoteModel> FindByAgenda(int agendaId, int userId)
        {
            var results = DbSet.Where(x => x.VoterId == userId)
                .Join(_context.AgendaItemData.Where(y => y.AgendaId == agendaId),
                    x => x.AgendaItemId,
                    y => y.Id,
                    (x, y) => x
                ).ToList();
            return Map(results);
        }

        public IEnumerable<VoteModel> FindByAgendaItem(int agendaItemId)
        {
            return FindBy(x => x.AgendaItemId == agendaItemId);
        }

        public VoteModel FindByAgendaItem(int agendaItemId, int userId)
        {
            return FindBy(x => x.AgendaItemId == agendaItemId && x.VoterId == userId).SingleOrDefault();
        }

        protected override IQueryable<AgendaItemVote> Include(IQueryable<AgendaItemVote> queryable)
        {
            return queryable.Include(x => x.VoteAnswer)
                .Include(y => y.Voter);
        }
    }
}
