using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices.ComTypes;
using System.Threading.Tasks;
using AMSuite2.API.Infrastructure.Models;
using Remotion.Linq;

namespace AMSuite2.API.Features.Core.Email
{
    public interface IEmailService
    {
        SearchResults<EmailModel> GetEmail(QueryModel<EmailModel> query);
        EmailModel GetEmailItem(int id);
        EmailModel AddEmailItem(EmailModel emailItem);
        EmailModel AddInviteEmailItem(EmailModel emailItem);
        EmailModel AddAgendaItemEmail(EmailModel model);
        EmailModel AddMeetingEmail(EmailModel model);
    }
    public class EmailService : IEmailService
    {
        private readonly IEmailRepository _repo;

        public EmailService(IEmailRepository repo)
        {
            _repo = repo;
        }

        public EmailModel AddEmailItem(EmailModel emailItem)
        {
            return _repo.Insert(emailItem);
        }

        public EmailModel AddInviteEmailItem(EmailModel emailItem)
        {
            return _repo.Insert(emailItem);
        }

        public EmailModel AddAgendaItemEmail(EmailModel model)
        {
            throw new NotImplementedException();
        }

        public SearchResults<EmailModel> GetEmail(QueryModel<EmailModel> query)
        {
            var results = query.IsNullOrDefault ? _repo.All() : _repo.FindBy(query);
            return new SearchResults<EmailModel>()
            {
                Results = results
            };
        }

        public EmailModel GetEmailItem(int id)
        {
            return _repo.FindByKey(id);
        }

        public EmailModel AddMeetingEmail(EmailModel model)
        {
            throw new NotImplementedException();
        }
    }
}
