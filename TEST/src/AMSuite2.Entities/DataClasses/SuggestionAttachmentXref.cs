using System;
using System.Collections.Generic;

namespace AMSuite2.Entities.DataClasses
{
    public partial class SuggestionAttachmentXref
    {
        public int SuggestionId { get; set; }
        public int AttachmentId { get; set; }

        public virtual Attachment Attachment { get; set; }
        public virtual Suggestion Suggestion { get; set; }
    }
}
