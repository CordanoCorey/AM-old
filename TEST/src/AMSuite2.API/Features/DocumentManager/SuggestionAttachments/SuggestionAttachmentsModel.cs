using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AMSuite2.API.Features.DocumentManager.Attachments;

namespace AMSuite2.API.Features.DocumentManager.SuggestionAttachments
{
    public class SuggestionAttachmentsModel
    {
        public int SuggestionId { get; set; }
        public IEnumerable<AttachmentModel> Attachments { get; set; }
    }
}
