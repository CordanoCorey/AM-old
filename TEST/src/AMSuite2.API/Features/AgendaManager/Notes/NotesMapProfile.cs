using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AMSuite2.API.Features.AgendaManager.Notes;
using AMSuite2.Entities.DataClasses;
using AutoMapper;

namespace AMSuite2.API.Infrastructure.Mapper
{
    public class NotesMapProfile : Profile
    {
        public NotesMapProfile()
        {
            CreateMap<AgendaRecord, NotesModel>()
                .ForMember(d => d.Notes, o => o.MapFrom(s => s.AgendaRecord1))
                .ForMember(d => d.CreatedBy, o => o.MapFrom(s => s.Createdby));

            CreateMap<NotesModel, AgendaRecord>()
                .ForMember(d => d.AgendaRecord1, o => o.MapFrom(s => s.Notes))
                .ForMember(d => d.AgendaRecordTypeId, o => o.MapFrom(s => 2))
                .ForMember(d => d.Createdby, o => o.MapFrom(s => s.CreatedBy));

            CreateMap<BinAgendaRecord, BinNotesModel>()
                .ForMember(d => d.Notes, o => o.MapFrom(s => s.AgendaRecord))
                .ForMember(d => d.BinItemId, o => o.MapFrom(s => s.BinAgendaItemId));

            CreateMap<BinNotesModel, BinAgendaRecord>()
                .ForMember(d => d.AgendaRecord, o => o.MapFrom(s => s.Notes))
                .ForMember(d => d.BinAgendaItemId, o => o.MapFrom(s => s.BinItemId))
                .ForMember(d => d.AgendaRecordTypeId, o => o.MapFrom(s => 2));
        }
    }
}
