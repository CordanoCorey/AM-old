using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AMSuite2.API.Infrastructure.Models;

namespace AMSuite2.API.Features.AgendaManager.Minutes
{
    public class MinutesModel : BaseEntity, IEntity
    {
        public int Id { get; set; }
        public int AgendaItemId { get; set; }
        public string Minutes { get; set; }
    }

    public class BinMinutesModel : BaseEntity, IEntity
    {
        public int Id { get; set; }
        public int BinItemId { get; set; }
        public string Minutes { get; set; }
    }
}
