using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AMSuite2.API.Infrastructure.Models;

namespace AMSuite2.API.Features.AgendaManager.Minutes
{
    public interface IMinutesService
    {
        SearchResults<MinutesModel> GetMinutes(QueryModel<MinutesModel> query);
        MinutesModel GetMinutes(int id);
        MinutesModel AddMinutes(MinutesModel model);
        MinutesModel UpdateMinutes(MinutesModel model);
        void DeleteMinutes(int id);
        IEnumerable<MinutesModel> GetMinutesForAgenda(int agendaId);
        IEnumerable<MinutesModel> GetMinutesForAgenda(int agendaId, int userId);
        IEnumerable<MinutesModel> GetMinutesForAgendaItem(int agendaItemId);
        MinutesModel GetMinutesForAgendaItem(int agendaItemId, int userId);
        IEnumerable<BinMinutesModel> GetMinutesForBinItem(int binItemId);
        BinMinutesModel GetMinutesForBinItem(int binItemId, int userId);
    }

    public class MinutesService : IMinutesService
    {
        private readonly IMinutesRepository _repo;
        private readonly IBinMinutesRepository _binRepo;

        public MinutesService(IMinutesRepository repo, IBinMinutesRepository binRepo)
        {
            _repo = repo;
            _binRepo = binRepo;
        }

        public MinutesModel AddMinutes(MinutesModel model)
        {
            var minutes = GetMinutesForAgendaItem(model.AgendaItemId, model.CreatedBy);
            if (minutes != null)
            {
                _repo.Delete(minutes.Id);
            }
            return _repo.Insert(model);
        }

        public void DeleteMinutes(int id)
        {
            _repo.Delete(id);
        }

        public SearchResults<MinutesModel> GetMinutes(QueryModel<MinutesModel> query)
        {
            var results = query.IsNullOrDefault ? _repo.All() : _repo.FindBy(query);
            return new SearchResults<MinutesModel>()
            {
                Results = results
            };
        }

        public MinutesModel GetMinutes(int id)
        {
            return _repo.FindByKey(id);
        }

        public IEnumerable<MinutesModel> GetMinutesForAgenda(int agendaId)
        {
            return _repo.FindByAgenda(agendaId);
        }

        public IEnumerable<MinutesModel> GetMinutesForAgenda(int agendaId, int userId)
        {
            return _repo.FindByAgenda(agendaId, userId);
        }

        public IEnumerable<MinutesModel> GetMinutesForAgendaItem(int agendaItemId)
        {
            return _repo.FindByAgendaItem(agendaItemId);
        }

        public MinutesModel GetMinutesForAgendaItem(int agendaItemId, int userId)
        {
            return _repo.FindByAgendaItem(agendaItemId, userId);
        }

        public IEnumerable<BinMinutesModel> GetMinutesForBinItem(int binItemId)
        {
            return _binRepo.FindByBinItem(binItemId);
        }

        public BinMinutesModel GetMinutesForBinItem(int binItemId, int userId)
        {
            return _binRepo.FindByBinItem(binItemId, userId);
        }

        public MinutesModel UpdateMinutes(MinutesModel model)
        {
            return _repo.Update(model);
        }
    }
}
