using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AMSuite2.API.Features.DocumentManager.AnnouncementAttachments;
using AMSuite2.Entities.DataClasses;
using AutoMapper;

namespace AMSuite2.API.Infrastructure.Mapper
{
    public class AnnouncementAttachmentMapProfile : Profile
    {
        public AnnouncementAttachmentMapProfile()
        {
            CreateMap<AnnouncementAttachment, AnnouncementAttachmentModel>()
                .ForMember(d => d.Name, o => o.MapFrom(s => s.AttachmentName))
                .ForMember(d => d.Order, o => o.MapFrom(s => s.DisplayOrder));

            CreateMap<AnnouncementAttachmentModel, AnnouncementAttachment>()
                .ForMember(d => d.AttachmentName, o => o.MapFrom(s => s.Name))
                .ForMember(d => d.DisplayOrder, o => o.MapFrom(s => s.Order));
        }
    }
}
