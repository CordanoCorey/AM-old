using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AMSuite2.API.Features.AgendaManager.Suggestions
{
    public interface ISuggestionsService
    {
        IEnumerable<SuggestionModel> GetSuggestions();
        SuggestionModel GetSuggestion(int id);
        SuggestionModel AddSuggestion(SuggestionModel model);
        SuggestionModel UpdateSuggestion(SuggestionModel model);
        void DeleteSuggestion(int id);
    }

    public class SuggestionsService : ISuggestionsService
    {
        private readonly ISuggestionsRepository _repo;

        public SuggestionsService(ISuggestionsRepository repo)
        {
            _repo = repo;
        }

        public SuggestionModel AddSuggestion(SuggestionModel model)
        {
            return _repo.Insert(model);
        }

        public void DeleteSuggestion(int id)
        {
            _repo.Delete(id);
        }

        public SuggestionModel GetSuggestion(int id)
        {
            return _repo.FindByKey(id);
        }

        public IEnumerable<SuggestionModel> GetSuggestions()
        {
            return _repo.All();
        }

        public SuggestionModel UpdateSuggestion(SuggestionModel model)
        {
            return _repo.Update(model);
        }
    }
}
