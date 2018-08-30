using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AMSuite2.API.Features.Core.Search
{
    public class SearchResults
    {
        public IEnumerable<SearchResult> Results { get; set; }
        public int TotalRows { get; set; }
    }
    public class SearchResult
    {
        public double Rank { get; set; }
        public string Title { get; set; }
        public string Author { get; set; }
        public int Size { get; set; }
        public string Path { get; set; }
        public string Icon { get; set; }
        public string HitHighlightedSummary { get; set; }
        public bool IsDocument { get; set; }
        public SearchLink MeetingLink { get; set; }
        public SearchLink AgendaLink { get; set; }
        public SearchLink AgendaItemLink { get; set; }

    }

    public class SearchLink
    {
        public string URL { get; set; }
        public string Name { get; set; }
    }

    public class SearchRequest
    {
        public string Querytext { get; set; }
        public string ClientType { get; set; }
        public string SourceId { get; set; }
        public string StartRow { get; set; }
        public string RowLimit { get; set; }
        public string EnableFQL { get; set; }
        public string TrimDuplicates { get; set; }
        public RefinementFilters RefinementFilters { get; set; }
        public String SelectProperties { get; set; }
    }

    public class RefinementFilters
    {
        public IEnumerable<string> results { get; set; }
    }

    public class SearchFiltersModel
    {
        public string Searchterms { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public int[] GroupIds { get; set; }
        public int StartIndex { get; set; }
        public bool AllPublic { get; set; }
        public bool AllAccount { get; set; }
    }

    public class GroupFilter
    {
        public int GroupId { get; set; }
        public string GroupName { get; set; }
    }

    public class GroupFilterQualityComparer : IEqualityComparer<GroupFilter>
    {
        public bool Equals(GroupFilter x, GroupFilter y)
        {
            return x.GroupId == y.GroupId && x.GroupName == y.GroupName;
        }

        public int GetHashCode(GroupFilter obj)
        {
            if (obj == null)
                return 0;

            return unchecked(obj.GroupId.GetHashCode());
        }
    }
}
