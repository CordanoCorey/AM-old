using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AMSuite2.API.Infrastructure.Repositories;
using AMSuite2.Entities.Context;
using AMSuite2.Entities.DataClasses;
using AutoMapper;

namespace AMSuite2.API.Features.DocumentManager.EmailAttachments
{
    public interface IEmailAttachmentsRepository : IBaseRepository<MailMessageAttachment, EmailAttachmentModel>
    {
        IEnumerable<EmailAttachmentModel> FindByAccountId(int accountId);
        IEnumerable<EmailAttachmentModel> FindByAgendaId(int agendaId);
        IEnumerable<EmailAttachmentModel> FindByAgendaItemId(int agendaItemId);
    }

    public class EmailAttachmentsRepository : BaseRepository<MailMessageAttachment, EmailAttachmentModel>, IEmailAttachmentsRepository
    {
        public EmailAttachmentsRepository(AMSuiteContext context, IMapper mapper) : base(context, mapper)
        {
        }

        public IEnumerable<EmailAttachmentModel> FindByAccountId(int accountId)
        {
            return FindBy(x => x.AccountId == accountId);
        }

        public IEnumerable<EmailAttachmentModel> FindByAgendaId(int agendaId)
        {
            return FindBy(x => x.AgendaId == agendaId);
        }

        public IEnumerable<EmailAttachmentModel> FindByAgendaItemId(int agendaItemId)
        {
            return FindBy(x => x.AgendaItemId == agendaItemId);
        }
    }
}
