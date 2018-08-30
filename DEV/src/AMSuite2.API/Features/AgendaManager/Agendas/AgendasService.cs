using AMSuite2.API.Infrastructure.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AMSuite2.API.Features.AgendaManager.AgendaItems;
using AMSuite2.API.Features.AgendaManager.Meetings;

namespace AMSuite2.API.Features.AgendaManager.Agendas
{
    public interface IAgendasService
    {
        SearchResults<AgendaModel> GetAgendas(QueryModel<AgendaModel> query);
        AgendaModel GetAgenda(int id);
        AgendaModel AddAgenda(AgendaModel item);
        AgendaModel UpdateAgenda(AgendaModel item);
        void DeleteAgenda(int id);
        IEnumerable<AgendaModel> GetMeetingAgendas(int meetingId);
        IEnumerable<AgendaModel> GetDeletedAgendas(int accountId);
        MeetingModel GetAgendaMeeting(int agendaId);
    }
    public class AgendasService : IAgendasService
    {
        private readonly IAgendasRepository _repo;
        private readonly IAgendaItemsService _agendaItems;

        public AgendasService(IAgendasRepository repo, IAgendaItemsService agendaItems)
        {
            _repo = repo;
            _agendaItems = agendaItems;
        }

        public AgendaModel AddAgenda(AgendaModel agenda)
        {
            return _repo.Insert(agenda);
        }

        public void DeleteAgenda(int id)
        {
            _repo.Delete(id);
        }

        public AgendaModel GetAgenda(int id)
        {
            var agenda = _repo.FindByKey(id);
            agenda.AgendaItems = _agendaItems.GetAgendaItems(id);
            return agenda;
        }

        public SearchResults<AgendaModel> GetAgendas(QueryModel<AgendaModel> query)
        {
            var results = query.IsNullOrDefault ? _repo.All() : _repo.FindBy(query);
            return new SearchResults<AgendaModel>()
            {
                Results = results
            };
        }

        public IEnumerable<AgendaModel> GetMeetingAgendas(int meetingId)
        {
            return _repo.FindByMeeting(meetingId);
        }

        public IEnumerable<AgendaModel> GetDeletedAgendas(int accountId)
        {
            return _repo.FindDeletedAgendas(accountId);
        }

        public MeetingModel GetAgendaMeeting(int agendaId)
        {
            var agenda = _repo.FindByKey(agendaId);
            return agenda.Meeting;
        }

        public AgendaModel UpdateAgenda(AgendaModel agenda)
        {
            return _repo.Update(agenda);
        }
    }
}
