using System;
using System.Collections.Generic;

namespace AMSuite2.Entities.DataClasses
{
    public partial class AttendanceLkp
    {
        public AttendanceLkp()
        {
            Attendance = new HashSet<Attendance>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string EnumCode { get; set; }

        public virtual ICollection<Attendance> Attendance { get; set; }
    }
}
