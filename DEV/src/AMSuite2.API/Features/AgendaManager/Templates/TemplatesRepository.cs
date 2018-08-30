using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AMSuite2.API.Infrastructure.Repositories;
using AMSuite2.Entities.Context;
using AMSuite2.Entities.DataClasses;
using AutoMapper;

namespace AMSuite2.API.Features.AgendaManager.Templates
{
    public interface ITemplatesRepository : IBaseRepository<Template, TemplateModel>
    {
        IEnumerable<TemplateModel> FindByUser(int userId);
    }

    public class TemplatesRepository : BaseRepository<Template, TemplateModel>, ITemplatesRepository
    {
        public TemplatesRepository(AMSuiteContext context, IMapper mapper) : base(context, mapper)
        {
        }

        public IEnumerable<TemplateModel> FindByUser(int userId)
        {
            return FindBy(x => x.CreatedBy == userId);
        }
    }
}
