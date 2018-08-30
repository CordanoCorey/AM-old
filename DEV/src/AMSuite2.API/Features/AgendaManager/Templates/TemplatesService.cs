using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AMSuite2.API.Infrastructure.Models;
using Remotion.Linq;

namespace AMSuite2.API.Features.AgendaManager.Templates
{
    public interface ITemplatesService
    {
        SearchResults<TemplateModel> GetTemplates(QueryModel<TemplateModel> query);
        TemplateModel GetTemplate(int id);
        TemplateModel AddTemplate(TemplateModel model);
        TemplateModel UpdateTemplate(TemplateModel model);
        void DeleteTemplate(int id);
        IEnumerable<TemplateModel> GetUserTemplates(int userId);
    }

    public class TemplatesService : ITemplatesService
    {
        private readonly ITemplatesRepository _repo;

        public TemplatesService(ITemplatesRepository repo)
        {
            _repo = repo;
        }

        public TemplateModel AddTemplate(TemplateModel model)
        {
            return _repo.Insert(model);
        }

        public void DeleteTemplate(int id)
        {
            _repo.Delete(id);
        }

        public TemplateModel GetTemplate(int id)
        {
            return _repo.FindByKey(id);
        }

        public SearchResults<TemplateModel> GetTemplates(QueryModel<TemplateModel> query)
        {
            var results = query.IsNullOrDefault ? _repo.All() : _repo.FindBy(query);
            return new SearchResults<TemplateModel>()
            {
                Results = results
            };
        }

        public IEnumerable<TemplateModel> GetUserTemplates(int userId)
        {
            return _repo.FindByUser(userId);
        }

        public TemplateModel UpdateTemplate(TemplateModel model)
        {
            return _repo.Update(model);
        }
    }
}
