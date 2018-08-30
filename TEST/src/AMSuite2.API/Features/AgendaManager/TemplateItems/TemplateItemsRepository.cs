using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AMSuite2.API.Infrastructure.Repositories;
using AMSuite2.Entities.Context;
using AMSuite2.Entities.DataClasses;
using AutoMapper;

namespace AMSuite2.API.Features.AgendaManager.TemplateItems
{
    public interface ITemplateItemsRepository : IBaseRepository<TemplateItem, TemplateItemModel>
    {
        IEnumerable<TemplateItemModel> FindByTemplate(int templateId);
    }

    public class TemplateItemsRepository : BaseRepository<TemplateItem, TemplateItemModel>, ITemplateItemsRepository
    {
        public TemplateItemsRepository(AMSuiteContext context, IMapper mapper) : base(context, mapper)
        {
        }

        public IEnumerable<TemplateItemModel> FindByTemplate(int templateId)
        {
            return FindBy(x => x.TemplateId == templateId);
        }
    }
}
