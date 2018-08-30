using System;
using System.Collections.Generic;

namespace AMSuite2.Entities.DataClasses
{
    public partial class ConferenceRoom
    {
        public int Id { get; set; }
        public int ConferenceLocationId { get; set; }
        public int ConferenceBuildingId { get; set; }
        public string RoomName { get; set; }

        public virtual ConferenceBuilding ConferenceBuilding { get; set; }
        public virtual ConferenceLocation ConferenceLocation { get; set; }
    }
}
