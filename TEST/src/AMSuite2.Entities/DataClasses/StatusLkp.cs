using System;
using System.Collections.Generic;

namespace AMSuite2.Entities.DataClasses
{
    public partial class StatusLkp
    {
        public StatusLkp()
        {
            Agenda = new HashSet<Agenda>();
            AgendaItemData = new HashSet<AgendaItemData>();
            BinAgendaItemData = new HashSet<BinAgendaItemData>();
            Meeting = new HashSet<Meeting>();
            Template = new HashSet<Template>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string EnumCode { get; set; }

        public virtual ICollection<Agenda> Agenda { get; set; }
        public virtual ICollection<AgendaItemData> AgendaItemData { get; set; }
        public virtual ICollection<BinAgendaItemData> BinAgendaItemData { get; set; }
        public virtual ICollection<Meeting> Meeting { get; set; }
        public virtual ICollection<Template> Template { get; set; }
    }
}
