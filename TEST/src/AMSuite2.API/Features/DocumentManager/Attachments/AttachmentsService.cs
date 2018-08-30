using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AMSuite2.API.Infrastructure.Models;
using Remotion.Linq;

namespace AMSuite2.API.Features.DocumentManager.Attachments
{
    public interface IAttachmentsService
    {
        SearchResults<AttachmentModel> GetAttachments(QueryModel<AttachmentModel> query);
        AttachmentModel GetAttachment(int id);
        AttachmentModel AddAttachment(AttachmentModel model);
        AttachmentModel UpdateAttachment(AttachmentModel model);
        void DeleteAttachment(int id);
        IEnumerable<AttachmentModel> GetAgendaItemAttachments(int agendaItemId);
        IEnumerable<AttachmentModel> SaveAgendaItemAttachments(int agendaItemId, IEnumerable<AttachmentModel> model);
        void DeleteAgendaItemAttachments(int agendaItemId);
        IEnumerable<AttachmentModel> GetAgendaAttachments(int agendaId);
    }

    public class AttachmentsService : IAttachmentsService
    {
        private readonly IAttachmentsRepository _repo;

        public AttachmentsService(IAttachmentsRepository repo)
        {
            _repo = repo;
        }

        public IEnumerable<AttachmentModel> SaveAgendaItemAttachments(int agendaItemId, IEnumerable<AttachmentModel> model)
        {
            DeleteAgendaItemAttachments(agendaItemId);
            _repo.Insert(model);
            return GetAgendaItemAttachments(agendaItemId);
        }

        public AttachmentModel AddAttachment(AttachmentModel model)
        {
            return _repo.Insert(model);
        }

        public void DeleteAttachment(int id)
        {
            _repo.Delete(id);
        }

        public IEnumerable<AttachmentModel> GetAgendaAttachments(int agendaId)
        {
            return _repo.FindByAgendaId(agendaId);
        }

        public IEnumerable<AttachmentModel> GetAgendaItemAttachments(int agendaItemId)
        {
            return _repo.FindByAgendaItemId(agendaItemId);
        }

        public AttachmentModel GetAttachment(int id)
        {
            return _repo.FindByKey(id);
        }

        public SearchResults<AttachmentModel> GetAttachments(QueryModel<AttachmentModel> query)
        {
            var results = query.IsNullOrDefault ? _repo.All() : _repo.FindBy(query);
            return new SearchResults<AttachmentModel>()
            {
                Results = results
            };
        }

        public void DeleteAgendaItemAttachments(int agendaItemId)
        {
            var attachments = GetAgendaItemAttachments(agendaItemId);
            var ids = attachments.Select(x => x.Id);
            _repo.Delete(ids);
        }

        public AttachmentModel UpdateAttachment(AttachmentModel model)
        {
            return _repo.Update(model);
        }
    }
}
