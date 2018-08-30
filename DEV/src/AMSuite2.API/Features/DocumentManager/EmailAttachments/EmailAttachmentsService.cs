using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AMSuite2.API.Infrastructure.Models;
using Remotion.Linq;

namespace AMSuite2.API.Features.DocumentManager.EmailAttachments
{
    public interface IEmailAttachmentsService
    {
        SearchResults<EmailAttachmentModel> GetEmailAttachments(QueryModel<EmailAttachmentModel> query);
        EmailAttachmentModel GetEmailAttachment(int id);
        EmailAttachmentModel AddEmailAttachment(EmailAttachmentModel model);
        EmailAttachmentModel UpdateEmailAttachment(EmailAttachmentModel model);
        void DeleteEmailAttachment(int id);
    }

    public class EmailAttachmentsService : IEmailAttachmentsService
    {
        private readonly IEmailAttachmentsRepository _repo;

        public EmailAttachmentsService(IEmailAttachmentsRepository repo)
        {
            _repo = repo;
        }

        public EmailAttachmentModel AddEmailAttachment(EmailAttachmentModel model)
        {
            return _repo.Insert(model);
        }

        public void DeleteEmailAttachment(int id)
        {
            _repo.Delete(id);
        }

        public EmailAttachmentModel GetEmailAttachment(int id)
        {
            return _repo.FindByKey(id);
        }

        public SearchResults<EmailAttachmentModel> GetEmailAttachments(QueryModel<EmailAttachmentModel> query)
        {
            var results = query.IsNullOrDefault ? _repo.All() : _repo.FindBy(query);
            return new SearchResults<EmailAttachmentModel>()
            {
                Results = results
            };
        }

        public EmailAttachmentModel UpdateEmailAttachment(EmailAttachmentModel model)
        {
            return _repo.Update(model);
        }
    }
}
