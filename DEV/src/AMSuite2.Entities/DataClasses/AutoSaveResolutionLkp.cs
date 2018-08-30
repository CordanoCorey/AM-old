using System;
using System.Collections.Generic;

namespace AMSuite2.Entities.DataClasses
{
    public partial class AutoSaveResolutionLkp
    {
        public AutoSaveResolutionLkp()
        {
            AutoSave = new HashSet<AutoSave>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string EnumCode { get; set; }

        public virtual ICollection<AutoSave> AutoSave { get; set; }
    }
}
