using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AMSuite2.API.Infrastructure.Models;

namespace AMSuite2.API.Features.AgendaManager.Suggestions
{
    public class SuggestionModel : BaseEntity, IEntity
    {
        public int Id { get; set; }
    }
}
