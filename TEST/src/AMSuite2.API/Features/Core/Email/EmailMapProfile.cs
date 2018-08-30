using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AMSuite2.API.Features.Core.Email;
using AutoMapper;
using AMSuite2.Entities.DataClasses;

namespace AMSuite2.API.Infrastructure.Mapper
{
    public class EmailMapProfile : Profile
    {
        public EmailMapProfile()
        {
            CreateMap<MailMessage, EmailModel>()
                .ForMember(d => d.CreatedDate, o => o.MapFrom(s => s.CreationDateTime));

            CreateMap<EmailModel, MailMessage>()
                .ForMember(d => d.CreationDateTime, o => o.MapFrom(s => s.CreatedDate));
        }
    }
}
