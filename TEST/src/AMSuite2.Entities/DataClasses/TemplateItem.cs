using System;
using System.Collections.Generic;
using AMSuite2.Entities.Identity;

namespace AMSuite2.Entities.DataClasses
{
    public partial class TemplateItem
    {
        public int Id { get; set; }
        public int TemplateId { get; set; }
        public int? ParentItemId { get; set; }
        public string TemplateItemName { get; set; }
        public DateTime? TemplateItemDate { get; set; }
        public string TemplateItemDescription { get; set; }
        public int DisplayOrder { get; set; }
        public bool? IsPrivate { get; set; }
        public bool? IsVotable { get; set; }
        public int CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public int UpdatedBy { get; set; }
        public DateTime UpdatedDate { get; set; }

        public virtual ApplicationUser CreatedByNavigation { get; set; }
        public virtual TemplateItem ParentItem { get; set; }
        public virtual ICollection<TemplateItem> InverseParentItem { get; set; }
        public virtual Template Template { get; set; }
        public virtual ApplicationUser UpdatedByNavigation { get; set; }
    }
}
