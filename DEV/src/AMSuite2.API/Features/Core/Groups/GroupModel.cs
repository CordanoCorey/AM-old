using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AMSuite2.API.Features.Core.GroupMembers;
using AMSuite2.API.Infrastructure.Models;

namespace AMSuite2.API.Features.Core.Groups
{
    public class GroupModel : BaseEntity, IEntity
    {
        public int Id { get; set; }
        public int AccountId { get; set; }
        public bool Active { get; set; }
        public int AdministratorId { get; set; }
        public bool AllowSuggestions { get; set; }
        public string Description { get; set; }
        public int GroupAdministratorId { get; set; }
        public string Name { get; set; }
        public int OutlineId { get; set; }


        public IEnumerable<GroupMemberModel> Administrators { get; set; } = new List<GroupMemberModel>();
        public IEnumerable<GroupMemberModel> Managers { get; set; } = new List<GroupMemberModel>();
        public int MemberCount { get; set; }
        public IEnumerable<GroupMemberModel> Members { get; set; } = new List<GroupMemberModel>();
    }

    public class GroupSearchModel
    {

    }
}
