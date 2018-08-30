using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AMSuite2.API.Features.AgendaManager.Minutes;
using AMSuite2.Entities.DataClasses;
using AutoMapper;

namespace AMSuite2.API.Infrastructure.Mapper
{
    public class MinutesMapProfile : Profile
    {
        public MinutesMapProfile()
        {
            CreateMap<AgendaRecord, MinutesModel>()
                .ForMember(d => d.Minutes, o => o.MapFrom(s => s.AgendaRecord1))
                .ForMember(d => d.CreatedBy, o => o.MapFrom(s => s.Createdby));

            CreateMap<MinutesModel, AgendaRecord>()
                .ForMember(d => d.AgendaRecord1, o => o.MapFrom(s => s.Minutes))
                .ForMember(d => d.AgendaRecordTypeId, o => o.MapFrom(s => 1))
                .ForMember(d => d.Createdby, o => o.MapFrom(s => s.CreatedBy));

            CreateMap<BinAgendaRecord, BinMinutesModel>()
                .ForMember(d => d.Minutes, o => o.MapFrom(s => s.AgendaRecord))
                .ForMember(d => d.BinItemId, o => o.MapFrom(s => s.BinAgendaItemId));

            CreateMap<BinMinutesModel, BinAgendaRecord>()
                .ForMember(d => d.AgendaRecord, o => o.MapFrom(s => s.Minutes))
                .ForMember(d => d.BinAgendaItemId, o => o.MapFrom(s => s.BinItemId))
                .ForMember(d => d.AgendaRecordTypeId, o => o.MapFrom(s => 1));
        }
    }
}
