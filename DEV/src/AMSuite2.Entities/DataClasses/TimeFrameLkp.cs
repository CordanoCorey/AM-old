using System;
using System.Collections.Generic;

namespace AMSuite2.Entities.DataClasses
{
    public partial class TimeFrameLkp
    {
        public TimeFrameLkp()
        {
            Agenda = new HashSet<Agenda>();
            Template = new HashSet<Template>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string TimeFrameDescription { get; set; }
        public string EnumCode { get; set; }

        public virtual ICollection<Agenda> Agenda { get; set; }
        public virtual ICollection<Template> Template { get; set; }
    }
}
