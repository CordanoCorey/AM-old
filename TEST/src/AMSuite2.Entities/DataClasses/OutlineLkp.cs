using System;
using System.Collections.Generic;

namespace AMSuite2.Entities.DataClasses
{
    public partial class OutlineLkp
    {
        public OutlineLkp()
        {
            Group = new HashSet<Group>();
            Meeting = new HashSet<Meeting>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string EnumCode { get; set; }

        public virtual ICollection<Group> Group { get; set; }
        public virtual ICollection<Meeting> Meeting { get; set; }
    }
}
