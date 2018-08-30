using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AMSuite2.API.Infrastructure.Lookup
{
    public interface ILookupService
    {
        IEnumerable<LookupModel> GetLookupTables(IEnumerable<string> keys);
        LookupModel GetLookupTable(string key);
    }
    public class LookupService : ILookupService
    {
        public ILookupRepository _repo;

        public LookupService(ILookupRepository repository)
        {
            _repo = repository;
        }

        public IEnumerable<LookupModel> GetLookupTables(IEnumerable<string> keys)
        {
            return keys.Select(GetLookupTable);
        }

        public LookupModel GetLookupTable(string key)
        {
            var defaults = new List<LookupValueModel>()
            {
                new LookupValueModel() { Id = 0, Description = "Select Value" }
            };

            var values = _repo.GetValues(key).ToList();

            return new LookupModel()
            {
                Key = key,
                Values = values
            };
        }
    }
}
