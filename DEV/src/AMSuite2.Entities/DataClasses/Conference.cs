using System;
using System.Collections.Generic;

namespace AMSuite2.Entities.DataClasses
{
    public partial class Conference
    {
        public int Id { get; set; }
        public string ConferenceName { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public DateTime? RegistrationCutOffDate { get; set; }
        public int? PointOfContactId { get; set; }
        public string PointOfContactPhone { get; set; }
        public int? ConferenceLocationId { get; set; }

        public virtual ConferenceLocation ConferenceLocation { get; set; }
    }
}
