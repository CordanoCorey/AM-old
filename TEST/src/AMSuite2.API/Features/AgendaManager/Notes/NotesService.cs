using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AMSuite2.API.Infrastructure.Models;

namespace AMSuite2.API.Features.AgendaManager.Notes
{
    public interface INotesService
    {
        SearchResults<NotesModel> GetNotes(QueryModel<NotesModel> query);
        NotesModel GetNotes(int id);
        NotesModel AddNotes(NotesModel model);
        NotesModel UpdateNotes(NotesModel model);
        void DeleteNotes(int id);
        IEnumerable<NotesModel> GetNotesForAgenda(int agendaId);
        IEnumerable<NotesModel> GetNotesForAgenda(int agendaId, int userId);
        IEnumerable<NotesModel> GetNotesForAgendaItem(int agendaItemId);
        NotesModel GetNotesForAgendaItem(int agendaItemId, int userId);
        IEnumerable<BinNotesModel> GetNotesForBinItem(int binItemId);
        BinNotesModel GetNotesForBinItem(int binItemId, int userId);
    }

    public class NotesService : INotesService
    {
        private readonly INotesRepository _repo;
        private readonly IBinNotesRepository _binRepo;

        public NotesService(INotesRepository repo, IBinNotesRepository binRepo)
        {
            _repo = repo;
            _binRepo = binRepo;
        }

        public NotesModel AddNotes(NotesModel model)
        {
            var notes = GetNotesForAgendaItem(model.AgendaItemId, model.CreatedBy);
            if (notes != null)
            {
                _repo.Delete(notes.Id);
            }
            return _repo.Insert(model);
        }

        public void DeleteNotes(int id)
        {
            _repo.Delete(id);
        }

        public SearchResults<NotesModel> GetNotes(QueryModel<NotesModel> query)
        {
            var results = query.IsNullOrDefault ? _repo.All() : _repo.FindBy(query);
            return new SearchResults<NotesModel>()
            {
                Results = results
            };
        }

        public NotesModel GetNotes(int id)
        {
            return _repo.FindByKey(id);
        }

        public NotesModel UpdateNotes(NotesModel model)
        {
            return _repo.Update(model);
        }

        public IEnumerable<NotesModel> GetNotesForAgenda(int agendaId)
        {
            return _repo.FindByAgenda(agendaId);
        }

        public IEnumerable<NotesModel> GetNotesForAgenda(int agendaId, int userId)
        {
            return _repo.FindByAgenda(agendaId, userId);
        }

        public IEnumerable<NotesModel> GetNotesForAgendaItem(int agendaItemId)
        {
            return _repo.FindByAgendaItem(agendaItemId);
        }

        public NotesModel GetNotesForAgendaItem(int agendaItemId, int userId)
        {
            return _repo.FindByAgendaItem(agendaItemId, userId);
        }

        public IEnumerable<BinNotesModel> GetNotesForBinItem(int binItemId)
        {
            return _binRepo.FindByBinItem(binItemId);
        }

        public BinNotesModel GetNotesForBinItem(int binItemId, int userId)
        {
            return _binRepo.FindByBinItem(binItemId, userId);
        }
    }
}
