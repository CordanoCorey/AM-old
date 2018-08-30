using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AMSuite2.API.Features.AgendaManager.Attendance;
using AMSuite2.Entities.DataClasses;
using AutoMapper;

namespace AMSuite2.API.Infrastructure.Mapper
{
    public class AttendanceMapProfile : Profile
    {
        public AttendanceMapProfile()
        {
            CreateMap<Attendance, AttendanceModel>()
                .ForMember(d => d.TypeId, o => o.MapFrom(s => s.AttendanceTypeId))
                .ForMember(d => d.UserId, o => o.MapFrom(s => s.AgendaUserId))
                .ForMember(d => d.CreatedDate, o => o.MapFrom(s => s.CreatedOn));

            CreateMap<AttendanceModel, Attendance>()
                .ForMember(d => d.AgendaUserId, o => o.MapFrom(s => s.UserId))
                .ForMember(d => d.AttendanceTypeId, o => o.MapFrom(s => s.TypeId))
                .ForMember(d => d.CreatedOn, o => o.MapFrom(s => s.CreatedDate));
        }
    }
}
