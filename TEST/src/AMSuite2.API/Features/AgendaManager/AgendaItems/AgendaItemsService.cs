using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AMSuite2.API.Infrastructure.Models;

namespace AMSuite2.API.Features.AgendaManager.AgendaItems
{
    public interface IAgendaItemsService
    {
        SearchResults<AgendaItemModel> GetAgendaItems(QueryModel<AgendaItemModel> query);
        IEnumerable<AgendaItemModel> GetAgendaItems(int agendaId);
        AgendaItemModel GetAgendaItem(int id);
        AgendaItemModel AddAgendaItem(AgendaItemModel item);
        AgendaItemModel UpdateAgendaItem(AgendaItemModel item);
        void DeleteAgendaItem(int id);
        IEnumerable<AgendaItemModel> GetMeetingAgendaItems(int meetingId);
    }
    public class AgendaItemsService : IAgendaItemsService
    {
        private readonly IAgendaItemsRepository _repo;

        public AgendaItemsService(IAgendaItemsRepository repo)
        {
            _repo = repo;
        }

        public AgendaItemModel AddAgendaItem(AgendaItemModel item)
        {
            return _repo.Insert(item);
        }

        public void DeleteAgendaItem(int id)
        {
            _repo.Delete(id);
        }

        public AgendaItemModel GetAgendaItem(int id)
        {
            return _repo.FindByKey(id);
        }

        public SearchResults<AgendaItemModel> GetAgendaItems(QueryModel<AgendaItemModel> query)
        {
            var results = query.IsNullOrDefault ? _repo.All() : _repo.FindBy(query);
            return new SearchResults<AgendaItemModel>()
            {
                Results = results
            };
        }

        public IEnumerable<AgendaItemModel> GetAgendaItems(int agendaId)
        {
            return _repo.FindByAgenda(agendaId);
        }

        public IEnumerable<AgendaItemModel> GetMeetingAgendaItems(int meetingId)
        {
            return _repo.FindByMeeting(meetingId);
        }

        public AgendaItemModel UpdateAgendaItem(AgendaItemModel item)
        {
            return _repo.Update(item);
        }
    }
}
