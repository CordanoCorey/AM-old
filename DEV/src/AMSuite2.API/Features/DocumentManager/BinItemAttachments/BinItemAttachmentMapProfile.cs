using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AMSuite2.API.Features.DocumentManager.BinItemAttachments;
using AMSuite2.Entities.DataClasses;
using AutoMapper;

namespace AMSuite2.API.Infrastructure.Mapper
{
    public class BinItemAttachmentMapProfile : Profile
    {
        public BinItemAttachmentMapProfile()
        {
            CreateMap<BinAttachment, BinItemAttachmentModel>()
                .ForMember(d => d.BinItemId, o => o.MapFrom(s => s.BinAgendaItemId))
                .ForMember(d => d.Name, o => o.MapFrom(s => s.AttachmentName))
                .ForMember(d => d.Order, o => o.MapFrom(s => s.DisplayOrder));

            CreateMap<BinItemAttachmentModel, BinAttachment>()
                .ForMember(d => d.BinAgendaItemId, o => o.MapFrom(s => s.BinItemId))
                .ForMember(d => d.AttachmentName, o => o.MapFrom(s => s.Name))
                .ForMember(d => d.DisplayOrder, o => o.MapFrom(s => s.Order));
        }
    }
}
