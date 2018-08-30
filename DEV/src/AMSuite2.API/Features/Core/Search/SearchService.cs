using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AMSuite2.API.Features.Core.Search
{
    public interface ISearchService
    {
        SearchResultModel Search(SearchFiltersModel search);
    }
    public class SearchService : ISearchService
    {
        public SearchResultModel Search(SearchFiltersModel search)
        {
            throw new NotImplementedException();
        }
    }
}
