using System;
using System.Collections.Generic;

namespace AMSuite2.Entities.DataClasses
{
    public partial class BinAgendaRecord
    {
        public int Id { get; set; }
        public int AgendaRecordTypeId { get; set; }
        public int BinAgendaItemId { get; set; }
        public string AgendaRecord { get; set; }

        public virtual AgendaRecordLkp AgendaRecordType { get; set; }
        public virtual BinAgendaItemData BinAgendaItem { get; set; }
    }
}
