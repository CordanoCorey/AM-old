using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AMSuite2.API.Infrastructure.Repositories;
using AMSuite2.Entities.Context;
using AMSuite2.Entities.DataClasses;
using AutoMapper;

namespace AMSuite2.API.Features.Core.Email
{
    public interface IEmailRepository : IBaseRepository<MailMessage, EmailModel>
    {
        
    }

    public class EmailRepository : BaseRepository<MailMessage, EmailModel>, IEmailRepository
    {
        public EmailRepository(AMSuiteContext context, IMapper mapper) : base(context, mapper)
        {
        }
    }
}
