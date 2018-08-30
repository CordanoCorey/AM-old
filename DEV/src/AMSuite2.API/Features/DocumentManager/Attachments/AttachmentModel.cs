using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AMSuite2.API.Features.AgendaManager.AgendaItems;
using AMSuite2.API.Infrastructure.Models;

namespace AMSuite2.API.Features.DocumentManager.Attachments
{
    public class AttachmentModel : BaseEntity, IEntity
    {
        public int Id { get; set; }
        public int? AgendaItemId { get; set; }
        public string FileExtension { get; set; }
        public Guid? FileId { get; set; }
        public bool IsPrivate { get; set; }
        public string Name { get; set; }
        public int Order { get; set; }

        public AgendaItemModel AgendaItem { get; set; }
    }
}