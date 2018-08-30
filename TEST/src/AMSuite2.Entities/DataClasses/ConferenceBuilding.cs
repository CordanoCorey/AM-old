using System;
using System.Collections.Generic;

namespace AMSuite2.Entities.DataClasses
{
    public partial class ConferenceBuilding
    {
        public ConferenceBuilding()
        {
            ConferenceRoom = new HashSet<ConferenceRoom>();
        }

        public int Id { get; set; }
        public int LocationId { get; set; }
        public string BuildingName { get; set; }

        public virtual ICollection<ConferenceRoom> ConferenceRoom { get; set; }
    }
}
