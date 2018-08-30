using System;
using System.Collections.Generic;

namespace AMSuite2.Entities.DataClasses
{
    public partial class AgendaLkp
    {
        public AgendaLkp()
        {
            Agenda = new HashSet<Agenda>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string AgendaDescription { get; set; }
        public string EnumCode { get; set; }

        public virtual ICollection<Agenda> Agenda { get; set; }
    }
}
