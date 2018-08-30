using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AMSuite2.API.Features.AgendaManager.Minutes;
using AMSuite2.API.Features.AgendaManager.Notes;
using AMSuite2.API.Features.AgendaManager.Votes;
using AMSuite2.API.Features.DocumentManager.Attachments;
using AMSuite2.API.Infrastructure.Models;
using Microsoft.EntityFrameworkCore.Query.ExpressionTranslators.Internal;

namespace AMSuite2.API.Features.AgendaManager.AgendaItems
{
    public class AgendaItemModel : BaseEntity, IEntity
    {
        public int Id { get; set; }
        public int AgendaId { get; set; }
        public string Description { get; set; }
        public bool IsPrivate { get; set; }
        public bool IsSuggestion { get; set; }
        public bool IsVotable { get; set; }
        public string Name { get; set; }
        public int Order { get; set; }
        public int? ParentId { get; set; }
        public int SecurityStatusId { get; set; }
        
        public IEnumerable<AgendaItemModel> AgendaItems { get; set; } = new List<AgendaItemModel>();
        public IEnumerable<AttachmentModel> Attachments { get; set; } = new List<AttachmentModel>();
        public MinutesModel Minutes { get; set; }
        public NotesModel Notes { get; set; }
        public string SecurityStatusName { get; set; }
    }
}
