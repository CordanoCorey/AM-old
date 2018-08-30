using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AMSuite2.API.Infrastructure.Models
{
    public class SearchResults<T>
    {
        public QueryModel<T> Query { get; set; }
        public IEnumerable<T> Results { get; set; }
        public int Total { get; set; }
    }
}
