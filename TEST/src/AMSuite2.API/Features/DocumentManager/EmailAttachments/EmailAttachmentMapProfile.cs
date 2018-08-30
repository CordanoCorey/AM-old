using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AMSuite2.API.Features.DocumentManager.EmailAttachments;
using AMSuite2.Entities.DataClasses;
using AutoMapper;

namespace AMSuite2.API.Infrastructure.Mapper
{
    public class EmailAttachmentMapProfile : Profile
    {
        public EmailAttachmentMapProfile()
        {
            CreateMap<MailMessageAttachment, EmailAttachmentModel>()
                .ForMember(d => d.EmailId, o => o.MapFrom(s => s.MailMessageId))
                .ForMember(d => d.FileId, o => o.MapFrom(s => s.Key));

            CreateMap<EmailAttachmentModel, MailMessageAttachment>()
                .ForMember(d => d.MailMessageId, o => o.MapFrom(s => s.EmailId))
                .ForMember(d => d.Key, o => o.MapFrom(s => s.FileId));
        }
    }
}
