using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AMSuite2.API.Features.Core.Groups;
using AMSuite2.API.Infrastructure.Models;

namespace AMSuite2.API.Features.AgendaManager.Templates
{
    public class TemplateModel : BaseEntity, IEntity
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public bool? DisplayMinutes { get; set; }
        public GroupModel Group { get; set; }
        public int? GroupId { get; set; }
        public string Name { get; set; }
        public int? StatusId { get; set; }
        public int? TimeFrameId { get; set; }
        public int? TypeId { get; set; }
    }
}
