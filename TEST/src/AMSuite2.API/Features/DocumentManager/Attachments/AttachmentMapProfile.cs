using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AMSuite2.API.Features.DocumentManager.Attachments;
using AMSuite2.Entities.DataClasses;
using AutoMapper;

namespace AMSuite2.API.Infrastructure.Mapper
{
    public class AttachmentMapProfile : Profile
    {
        public AttachmentMapProfile()
        {
            CreateMap<Attachment, AttachmentModel>()
                .ForMember(d => d.Name, o => o.MapFrom(s => s.AttachmentName))
                .ForMember(d => d.Order, o => o.MapFrom(s => s.DisplayOrder))
                .ForMember(d => d.CreatedDate, o => o.MapFrom(s => s.CreatedOn))
                .ForMember(d => d.LastModifiedDate, o => o.MapFrom(s => s.LastModifiedOn));

            CreateMap<AttachmentModel, Attachment>()
                .ForMember(d => d.AttachmentName, o => o.MapFrom(s => s.Name))
                .ForMember(d => d.DisplayOrder, o => o.MapFrom(s => s.Order))
                .ForMember(d => d.CreatedOn, o => o.MapFrom(s => s.CreatedDate))
                .ForMember(d => d.LastModifiedOn, o => o.MapFrom(s => s.LastModifiedDate));
        }
    }
}
