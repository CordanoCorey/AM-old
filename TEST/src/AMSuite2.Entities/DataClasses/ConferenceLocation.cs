using System;
using System.Collections.Generic;

namespace AMSuite2.Entities.DataClasses
{
    public partial class ConferenceLocation
    {
        public ConferenceLocation()
        {
            Conference = new HashSet<Conference>();
            ConferenceRoom = new HashSet<ConferenceRoom>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Zip { get; set; }
        public string Telephone { get; set; }
        public string Email { get; set; }

        public virtual ICollection<Conference> Conference { get; set; }
        public virtual ICollection<ConferenceRoom> ConferenceRoom { get; set; }
    }
}
