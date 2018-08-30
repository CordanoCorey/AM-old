using System;
using System.Collections.Generic;
using AMSuite2.Entities.Identity;

namespace AMSuite2.Entities.DataClasses
{
    public partial class Template
    {
        public Template()
        {
            TemplateItem = new HashSet<TemplateItem>();
        }

        public int Id { get; set; }
        public string TemplateName { get; set; }
        public string TemplateDescription { get; set; }
        public int? TemplateTypeId { get; set; }
        public int CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public int UpdatedBy { get; set; }
        public DateTime UpdatedDate { get; set; }
        public int? StatusId { get; set; }
        public int? GroupId { get; set; }
        public int? TimeFrameId { get; set; }
        public bool? DisplayMinutes { get; set; }

        public virtual ICollection<TemplateItem> TemplateItem { get; set; }
        public virtual ApplicationUser CreatedByNavigation { get; set; }
        public virtual Group Group { get; set; }
        public virtual StatusLkp Status { get; set; }
        public virtual TemplateLkp TemplateType { get; set; }
        public virtual TimeFrameLkp TimeFrame { get; set; }
        public virtual ApplicationUser UpdatedByNavigation { get; set; }
    }
}
