using System;
using System.Collections.Generic;

namespace AMSuite2.Entities.DataClasses
{
    public partial class AgendaRecordLkp
    {
        public AgendaRecordLkp()
        {
            AgendaRecord = new HashSet<AgendaRecord>();
            BinAgendaRecord = new HashSet<BinAgendaRecord>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string EnumCode { get; set; }

        public virtual ICollection<AgendaRecord> AgendaRecord { get; set; }
        public virtual ICollection<BinAgendaRecord> BinAgendaRecord { get; set; }
    }
}
