using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AMSuite2.API.Infrastructure.Repositories;
using AMSuite2.Entities.Context;
using AMSuite2.Entities.DataClasses;
using AutoMapper;

namespace AMSuite2.API.Features.AgendaManager.Suggestions
{
    public interface ISuggestionsRepository : IBaseRepository<Suggestion, SuggestionModel>
    {
        
    }

    public class SuggestionsRepository : BaseRepository<Suggestion, SuggestionModel>, ISuggestionsRepository
    {
        public SuggestionsRepository(AMSuiteContext context, IMapper mapper) : base(context, mapper)
        {
        }
    }
}
