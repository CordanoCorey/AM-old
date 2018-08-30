using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using System.Threading.Tasks;
using AMSuite2.API.Infrastructure.Repositories;

namespace AMSuite2.API.Infrastructure.Models
{
    public interface IQueryModel
    {
        int UserId { get; set; }
        int AccountId { get; set; }
        IEnumerable<string> Fields { get; set; }
        IEnumerable<string> Filters { get; set; }
        IEnumerable<string> Groups { get; set; }
        int Skip { get; set; }
        IEnumerable<string> Sort { get; set; }
        int Take { get; set; }
        string Term { get; set; }
    }

    public class QueryModel<TModel> : IQueryModel
    {
        public int AccountId { get; set; }
        public int UserId { get; set; }
        public IEnumerable<string> Fields { get; set; }
        public IEnumerable<string> Filters { get; set; }
        public IEnumerable<string> Groups { get; set; }
        public int Skip { get; set; }
        public IEnumerable<string> Sort { get; set; }
        public int Take { get; set; }
        public string Term { get; set; }

        public Func<TModel, bool> FilterBy { get; set; }
        public Func<TModel, object> GroupBy { get; set; }
        public Func<TModel, object> Include { get; set; }
        public bool IsNullOrDefault =>
            Skip == 0 && Take == 0 && Fields == null && Filters == null && Groups == null && Sort == null;
        public Func<TModel, object> Map { get; set; } = (TModel x) => x;

        public Func<TModel, object> OrderBy
        {
            get {
                return Sort.IsAny()
                    ? (Func<TModel, object>) ((TModel x) => x.GetType().GetProperty(Sort.First()).GetValue(x, null))
                    : null;
            }
        }

        public Func<TModel, bool> Predicate { get; set; } = (TModel x) => true;
    }

    public interface Filter
    {
        
    }
}
