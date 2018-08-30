using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AMSuite2.API.Features.AgendaManager.AgendaItems;
using AMSuite2.API.Features.AgendaManager.Meetings;
using AMSuite2.API.Features.Core.Groups;
using AMSuite2.API.Infrastructure.Models;

namespace AMSuite2.API.Features.AgendaManager.Agendas
{
    public class AgendaModel : BaseEntity, IEntity
    {
        public int Id { get; set; }
        public DateTime? AgendaDate { get; set; }
        public int AgendaTypeId { get; set; }
        public bool Deleted { get; set; }
        public string Description { get; set; }
        public bool DisplayMinutes { get; set; }
        public int DisplayOrder { get; set; }
        public int? GroupId { get; set; }
        public DateTime? MarkedForDelete { get; set; }
        public int? MeetingId { get; set; }
        public string Name { get; set; }
        public bool RollcallTaken { get; set; }
        public int SecurityStatusId { get; set; }
        public int? TimeframeId { get; set; }

        public IEnumerable<AgendaItemModel> AgendaItems { get; set; }
        public string AgendaTypeName { get; set; }
        public string CreatedByName { get; set; }
        public GroupModel Group { get; set; }
        public string GroupName { get; set; }
        public MeetingModel Meeting { get; set; }
        public string SecurityStatusName { get; set; }
        public string TimeframeDescription { get; set; }
    }
}
