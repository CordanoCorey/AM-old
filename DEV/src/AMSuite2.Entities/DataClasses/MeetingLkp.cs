using System;
using System.Collections.Generic;

namespace AMSuite2.Entities.DataClasses
{
    public partial class MeetingLkp
    {
        public MeetingLkp()
        {
            Meeting = new HashSet<Meeting>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string EnumCode { get; set; }

        public virtual ICollection<Meeting> Meeting { get; set; }
    }
}
