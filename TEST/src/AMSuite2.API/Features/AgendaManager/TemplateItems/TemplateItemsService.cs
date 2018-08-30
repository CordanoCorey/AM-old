using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AMSuite2.API.Features.AgendaManager.TemplateItems
{
    public interface ITemplateItemsService
    {
        IEnumerable<TemplateItemModel> GetTemplateItems(int templateId);
        TemplateItemModel GetTemplateItem(int id);
        TemplateItemModel AddTemplateItem(TemplateItemModel model);
        TemplateItemModel UpdateTemplateItem(TemplateItemModel model);
        void DeleteTemplateItem(int id);
    }

    public class TemplateItemsService : ITemplateItemsService
    {
        private readonly ITemplateItemsRepository _repo;

        public TemplateItemsService(ITemplateItemsRepository repo)
        {
            _repo = repo;
        }

        public TemplateItemModel AddTemplateItem(TemplateItemModel model)
        {
            return _repo.Insert(model);
        }

        public void DeleteTemplateItem(int id)
        {
            _repo.Delete(id);
        }

        public TemplateItemModel GetTemplateItem(int id)
        {
            return _repo.FindByKey(id);
        }

        public IEnumerable<TemplateItemModel> GetTemplateItems(int templateId)
        {
            return _repo.FindByTemplate(templateId);
        }

        public TemplateItemModel UpdateTemplateItem(TemplateItemModel model)
        {
            return _repo.Update(model);
        }
    }
}
