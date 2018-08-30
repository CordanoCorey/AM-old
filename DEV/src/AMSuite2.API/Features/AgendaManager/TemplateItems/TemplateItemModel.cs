using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AMSuite2.API.Infrastructure.Models;

namespace AMSuite2.API.Features.AgendaManager.TemplateItems
{
    public class TemplateItemModel : BaseEntity, IEntity
    {
        public int Id { get; set; }
        public DateTime? Date { get; set; }
        public string Description { get; set; }
        public bool? IsPrivate { get; set; }
        public bool? IsVotable { get; set; }
        public string Name { get; set; }
        public int Order { get; set; }
        public int? ParentId { get; set; }
        public int TemplateId { get; set; }
    }
}
