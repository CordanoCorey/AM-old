using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AMSuite2.API.Features.AgendaManager.Minutes;
using AMSuite2.API.Features.AgendaManager.Notes;
using AMSuite2.API.Features.DocumentManager.Attachments;
using AMSuite2.API.Infrastructure.Models;

namespace AMSuite2.API.Features.AgendaManager.BinItems
{
    public class BinItemModel : BaseEntity, IEntity
    {
        public int Id { get; set; }
        public int AccountId { get; set; }
        public string Description { get; set; }
        public bool IsSuggestion { get; set; }
        public bool IsVotable { get; set; }
        public string Name { get; set; }
        public int Order { get; set; }
        public int? ParentId { get; set; }
        public int SecurityStatusId { get; set; }
        public string SecurityStatusName { get; set; }
        public int UserId { get; set; }

        public IEnumerable<AttachmentModel> Attachments { get; set; }
        public MinutesModel Minutes { get; set; }
        public NotesModel Notes { get; set; }
    }
}
