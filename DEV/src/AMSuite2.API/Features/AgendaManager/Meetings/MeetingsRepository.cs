using AMSuite2.API.Infrastructure.Repositories;
using AMSuite2.Entities.DataClasses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using AMSuite2.API.Features.AgendaManager.Agendas;
using AMSuite2.API.Infrastructure.Models;
using AMSuite2.Entities.Context;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace AMSuite2.API.Features.AgendaManager.Meetings
{
    public interface IMeetingsRepository : IBaseRepository<Meeting, MeetingModel>
    {
        IEnumerable<MeetingModel> FindByAccount(int accountId, DateTime startDate, DateTime endDate);
        IEnumerable<MeetingModel> FindByAccount(int accountId, DateTime startDate, DateTime endDate, QueryModel<MeetingModel> query);
        IEnumerable<MeetingModel> FindByGroup(int groupId, DateTime startDate, DateTime endDate);
        IEnumerable<MeetingModel> FindByGroup(int groupId, DateTime startDate, DateTime endDate, QueryModel<MeetingModel> query);
        IEnumerable<MeetingModel> FindDeletedMeetings(int accountId);
        IEnumerable<MeetingModel> GetMeetingListForAdmins(MeetingFiltersModel filters);
    }

    public class MeetingsRepository : BaseRepository<Meeting, MeetingModel>, IMeetingsRepository
    {
        public MeetingsRepository(AMSuiteContext context, IMapper mapper) : base(context, mapper)
        {

        }

        public IEnumerable<MeetingModel> FindByAccount(int accountId, DateTime startDate, DateTime endDate)
        {
            return FindBy(x => x.AccountId == accountId && x.MeetingDate >= startDate &&
                               x.MeetingDate <= endDate);
        }

        public IEnumerable<MeetingModel> FindByAccount(int accountId, DateTime startDate, DateTime endDate, QueryModel<MeetingModel> query)
        {
            return FindBy(query, x => x.AccountId == accountId && x.MeetingDate >= startDate &&
                                      x.MeetingDate <= endDate);
        }

        public IEnumerable<MeetingModel> FindByGroup(int groupId, DateTime startDate, DateTime endDate)
        {
            return FindBy(x => x.GroupId == groupId && x.MeetingDate >= startDate &&
                               x.MeetingDate <= endDate);
        }

        public IEnumerable<MeetingModel> FindByGroup(int groupId, DateTime startDate, DateTime endDate, QueryModel<MeetingModel> query)
        {
            return FindBy(query, x => x.GroupId == groupId && x.MeetingDate >= startDate &&
                                      x.MeetingDate <= endDate);
        }

        public IEnumerable<MeetingModel> FindDeletedMeetings(int accountId)
        {
            return accountId == 6 ? FindBy(x => x.MarkedForDelete != null) : FindBy(x => x.AccountId == accountId && x.MarkedForDelete != null);
        }


        //TODO-Clean this up.  Remove any logic to check for admins.  It also seems to do an extra ennumeration.
        //public IEnumerable<MeetingModel> GetMeetingListForGroupMembers(int id, int accountid, int level, MeetingFiltersModel filters)
        //{

        //    IEnumerable<MeetingModel> myMeetingList = (from m in _context.Meeting
        //                                               where ((m.AccountId == accountid) //Account filter
        //                                                      && !m.MarkedForDelete.HasValue //filter out marked for delete
        //                                                      && (m.MeetingDate >= filters.StartDate && m.MeetingDate <= filters.EndDate) //date filter
        //                                                      && (m.GroupId.Value == filters.GroupId || filters.GroupId == 0)) //group filter if available
        //                                                         || (m.StatusId == (int)EnumModel.Status.Public) //meeting is public anyone has access
        //                                                         || (m.StatusId == (int)EnumModel.Status.Account)
        //                                                         //meeting is account based and we already filtered by account (We don't even need this but it shortcuts the query)
        //                                                         ||
        //                                                         (m.StatusId == (int)EnumModel.Status.GroupMember &&
        //                                                          m.Group.GroupMembershipXref.Where(x => x.AgendaUserId == id).Any())
        //                                                         //meeting is group based and user is a member of the group
        //                                                         ||
        //                                                         ((m.Group != null && m.Group.GroupAdministratorId.HasValue)
        //                                                             ? m.Group.GroupAdministratorId.Value == id
        //                                                             : false) //User is the Group Administrator
        //                                                         ||
        //                                                         (m.Group != null &&
        //                                                          (m.Group.GroupMembershipXref.Where(
        //                                                               x =>
        //                                                                   x.AgendaUserId == id &&
        //                                                                   x.GroupRoleId == (int)EnumModel.GroupMembershipRole.Manager).Any()
        //                                                           ||
        //                                                           m.Group.GroupMembershipXref.Where(
        //                                                               x =>
        //                                                                   x.AgendaUserId == id &&
        //                                                                   x.GroupRoleId == (int)EnumModel.GroupMembershipRole.Contributor).Any())))
        //                                               //User is Group Manager or Contributor
        //                                               select m).AsEnumerable().Select(x => new MeetingModel
        //                                               {
        //                                                   Id = x.Id,
        //                                                   MeetingName = x.MeetingName,
        //                                                   MeetingDate = x.MeetingDate,
        //                                                   Location = x.MeetingLocation ?? "",
        //                                                   StartTime = new DateTime().Add(x.StartTime).ToString("h:mm tt"),
        //                                                   URLBase = x.Account.URLBase,
        //                                                   Group = x.Group == null ? string.Empty : x.Group.GroupName,
        //                                                   agenda = (from a in x.Agenda
        //                                                             where !a.MarkedForDelete.HasValue //Not marked for delete
        //                                                                   && (a.StatusId != (int)EnumModel.Status.Private //Not Private
        //                                                                       ||
        //                                                                       ((x.Group != null && x.Group.GroupAdministratorId.HasValue &&
        //                                                                         x.Group.GroupAdministratorId.Value == id)
        //                                                                        ||
        //                                                                        (x.Group != null &&
        //                                                                         x.Group.GroupMembership_xref.Where(
        //                                                                             y =>
        //                                                                                 y.AgendaUserId == id &&
        //                                                                                 y.GroupRoleId == (int)EnumModel.GroupMembershipRole.Manager).Any())
        //                                                                        ||
        //                                                                        (x.Group != null &&
        //                                                                         x.Group.GroupMembership_xref.Where(
        //                                                                             y =>
        //                                                                                 y.AgendaUserId == id &&
        //                                                                                 y.GroupRoleId == (int)EnumModel.GroupMembershipRole.Contributor).Any())
        //                                                                        )
        //                                                             //Edit Rights = System or Account Admin, Group Access Selected & User is Group Admin, Group Manager, or Group Contributor
        //                                                             select new DisplayAgendaModel
        //                                                             {
        //                                                                 Id = a.Id,
        //                                                                 Name = a.AgendaName,
        //                                                                 Order = a.DisplayOrder,
        //                                                                 URLBase = a.Meeting.Account.URLBase,
        //                                                                 MeetingId = (int)a.MeetingId,
        //                                                                 OutlineId = x.OutlineId.HasValue ? x.OutlineId.Value : 1
        //                                                             })
        //                                               }).OrderBy(y => y.MeetingDate).Take(numberOfMeetings);

        //    return myMeetingList;
        //}

        public IEnumerable<MeetingModel> GetMeetingListForAdmins(MeetingFiltersModel filters)
        {

            IEnumerable<MeetingModel> myMeetingList = (from m in _context.Meeting
                                                       where ((m.AccountId == filters.AccountId) //Account filter
                                                              && !m.MarkedForDelete.HasValue //filter not marked for delete
                                                              && (m.MeetingDate >= filters.StartDate && m.MeetingDate <= filters.EndDate) //date filter
                                                              && (m.GroupId.Value == filters.GroupId || filters.GroupId == 0)) //group filter if available
                                                       select new MeetingModel()
                                                       {
                                                           Id = m.Id,
                                                           Name = m.MeetingName,
                                                           Date = m.MeetingDate,
                                                           Location = m.MeetingLocation,
                                                           StartTime = m.StartTime,
                                                           GroupName = m.Group == null ? string.Empty : m.Group.GroupName,
                                                           Agendas = (from a in _context.Agenda
                                                                     where a.MeetingId == m.Id && !a.MarkedForDelete.HasValue //Not marked for delete
                                                                     select new AgendaModel
                                                                     {
                                                                         Id = a.Id,
                                                                         Name = a.AgendaName,
                                                                         DisplayOrder = a.DisplayOrder,
                                                                         MeetingId = (int)a.MeetingId,
                                                                         //OutlineId = x.OutlineId.HasValue ? x.OutlineId.Value : 1 //Not sure what this does yet
                                                                     })
                                                       }).OrderBy(y => y.Date).Take(filters.TakeNumber);

            return myMeetingList;
        }

        //Original AMSuite call
        //public IEnumerable<DisplayMeetingModel> GetMeetingList(int id, int accountid, int level, int groupid, int numberOfMeetings, DateTime startDate, DateTime endDate)
        //{
        //    bool UseDateFilter = false;
        //    if (numberOfMeetings == 0)
        //    {
        //        UseDateFilter = true;
        //        numberOfMeetings = 200;
        //    }
        //    //handle previous dates
        //    if (endDate < startDate)
        //    {
        //        startDate = endDate;
        //        endDate = DateTime.Today;
        //    }
        //IEnumerable<DisplayMeetingModel> myMeetingList;
        //using (var newContext = new AgendaMan_2014Entities()) { 

        //meetings with agendas
        //use agenda security info.
        //agenda has account access and user is part of the account
        //agenda has group or public access and user is part of the group
        //agenda has private access and user created, is current group admin, or account admin.
        //IEnumerable<DisplayMeetingModel> myMeetingList = (from m in _context.Meetings
        //                                                  where ((m.AccountId == accountid) //Account filter
        //                                                     && !m.MarkedForDelete.HasValue //filter out marked for delete
        //                                                     && ((UseDateFilter == true && (m.MeetingDate >= startDate && m.MeetingDate <= endDate)) || (UseDateFilter == false && m.MeetingDate >= DateTime.Today)) //date filter
        //                                                        && (m.GroupId.Value == groupid || groupid == 0))  //group filter if available
        //                                                        && ((level == 1 || level == 2) //system or account admin
        //                                                        || (m.StatusId == (int)EnumModel.Status.Public)  //meeting is public anyone has access
        //                                                        || (m.StatusId == (int)EnumModel.Status.Account) //meeting is account based and we already filtered by account (We don't even need this but it shortcuts the query)
        //                                                        || (m.StatusId == (int)EnumModel.Status.GroupMember && m.Group.GroupMembership_xref.Where(x => x.AgendaUserId == id).Any()) //meeting is group based and user is a member of the group
        //                                                        || ((m.Group != null && m.Group.GroupAdministratorId.HasValue) ? m.Group.GroupAdministratorId.Value == id : false)  //User is the Group Administrator
        //                                                        || (m.Group != null && (m.Group.GroupMembership_xref.Where(x => x.AgendaUserId == id && x.GroupRoleId == (int)EnumModel.GroupMembershipRole.Manager).Any()
        //                                                                            || m.Group.GroupMembership_xref.Where(x => x.AgendaUserId == id && x.GroupRoleId == (int)EnumModel.GroupMembershipRole.Contributor).Any())))  //User is Group Manager or Contributor
        //                                                  select m).AsEnumerable().Select(x => new DisplayMeetingModel
        //                                                  {
        //                                                      MeetingId = x.Id,
        //                                                      MeetingName = x.MeetingName,
        //                                                      MeetingDate = x.MeetingDate,
        //                                                      Location = x.MeetingLocation ?? "",
        //                                                      StartTime = new DateTime().Add(x.StartTime).ToString("h:mm tt"),
        //                                                      URLBase = x.Account.URLBase,
        //                                                      Group = x.Group == null ? string.Empty : x.Group.GroupName,
        //                                                      agenda = (from a in x.Agenda
        //                                                                where !a.MarkedForDelete.HasValue //Not marked for delete
        //                                                                && (a.StatusId != (int)EnumModel.Status.Private  //Not Private
        //                                                                || ((x.Group != null && x.Group.GroupAdministratorId.HasValue && x.Group.GroupAdministratorId.Value == id)
        //                                                                       || (x.Group != null && x.Group.GroupMembership_xref.Where(y => y.AgendaUserId == id && y.GroupRoleId == (int)EnumModel.GroupMembershipRole.Manager).Any())
        //                                                                       || (x.Group != null && x.Group.GroupMembership_xref.Where(y => y.AgendaUserId == id && y.GroupRoleId == (int)EnumModel.GroupMembershipRole.Contributor).Any())
        //                                                                       || level == 2 || level == 1)) //Edit Rights = System or Account Admin, Group Access Selected & User is Group Admin, Group Manager, or Group Contributor
        //                                                                select new DisplayAgendaModel
        //                                                                {
        //                                                                    Id = a.Id,
        //                                                                    Name = a.AgendaName,
        //                                                                    Order = a.DisplayOrder,
        //                                                                    URLBase = a.Meeting.Account.URLBase,
        //                                                                    MeetingId = (int)a.MeetingId,
        //                                                                    OutlineId = x.OutlineId.HasValue ? x.OutlineId.Value : 1
        //                                                                })
        //                                                  }).OrderBy(y => y.MeetingDate).Take(numberOfMeetings);

        //  return myMeetingList;
        //}


        protected override IQueryable<Meeting> Include(IQueryable<Meeting> queryable)
        {
            return queryable.Include(x => x.Account)
                .Include(x => x.Agenda)
                .Include(x => x.Group);
        }

        protected override IQueryable<Meeting> IncludeSingle(IQueryable<Meeting> queryable)
        {
            return queryable.Include(x => x.Account)
                .Include(x => x.Agenda);
        }

        public override MeetingModel Map(Meeting entity)
        {
            var agendas = entity.Agenda.Select(x => _mapper.Map<AgendaModel>(x));
            var model = _mapper.Map<MeetingModel>(entity);
            model.Agendas = agendas;
            return model;
        }
    }
}
