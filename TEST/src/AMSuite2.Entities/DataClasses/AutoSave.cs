using System;
using System.Collections.Generic;
using AMSuite2.Entities.Identity;

namespace AMSuite2.Entities.DataClasses
{
    public partial class AutoSave
    {
        public int Id { get; set; }
        public int AgendaUserId { get; set; }
        public string PageUrl { get; set; }
        public string RichTextBoxId { get; set; }
        public int ResolutionId { get; set; }
        public string AutoSaveText { get; set; }
        public string OriginalText { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime ModifiedDate { get; set; }

        public virtual ApplicationUser AgendaUser { get; set; }
        public virtual AutoSaveResolutionLkp Resolution { get; set; }
    }
}
