using System;
using System.Collections.Generic;

namespace AMSuite2.Entities.DataClasses
{
    public partial class TemplateLkp
    {
        public TemplateLkp()
        {
            Template = new HashSet<Template>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string TemplateDescription { get; set; }
        public string EnumCode { get; set; }

        public virtual ICollection<Template> Template { get; set; }
    }
}
