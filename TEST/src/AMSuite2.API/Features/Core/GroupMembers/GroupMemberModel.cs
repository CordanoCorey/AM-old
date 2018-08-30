using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AMSuite2.API.Features.Core.Groups;
using AMSuite2.API.Features.Core.Users;

namespace AMSuite2.API.Features.Core.GroupMembers
{
    public class GroupMemberModel
    {
        public int UserId { get; set; }
        public int GroupId { get; set; }
        public int GroupRoleId { get; set; }

        public int AccountId { get; set; }
        public GroupModel Group { get; set; }
        public string GroupRole { get; set; }
        public bool IsManager => GroupRoleId == 1;
        public bool IsContributor => GroupRoleId == 2;
        public bool IsMember => GroupRoleId == 3;
        public bool IsAttendanceTaker => GroupRoleId == 4;
        public bool IsMinuteTaker => GroupRoleId == 5;
        public bool IsVoteTaker => GroupRoleId == 6;
        public bool IsVoter => GroupRoleId == 7;
        public UserModel User { get; set; }
    }
}