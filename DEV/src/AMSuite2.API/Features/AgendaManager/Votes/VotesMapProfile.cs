using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AMSuite2.API.Features.AgendaManager.Votes;
using AMSuite2.Entities.DataClasses;
using AutoMapper;

namespace AMSuite2.API.Infrastructure.Mapper
{
    public class VotesMapProfile : Profile
    {
        public VotesMapProfile()
        {
            CreateMap<AgendaItemVote, VoteModel>()
                .ForMember(d => d.Answer, o => o.MapFrom(s => s.VoteAnswer.Name))
                .ForMember(d => d.AnswerId, o => o.MapFrom(s => s.VoteAnswerId))
                .ForMember(d => d.VoterName, o => o.MapFrom(s => s.Voter.FullName))
                .ForMember(d => d.CreatedDate, o => o.MapFrom(s => s.CreatedOn))
                .ForMember(d => d.LastModifiedDate, o => o.MapFrom(s => s.LastModifiedOn));

            CreateMap<VoteModel, AgendaItemVote>()
                .ForMember(d => d.VoteAnswerId, o => o.MapFrom(s => s.AnswerId))
                .ForMember(d => d.CreatedOn, o => o.MapFrom(s => s.CreatedDate))
                .ForMember(d => d.LastModifiedOn, o => o.MapFrom(s => s.LastModifiedDate));
        }
    }
}
