using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AMSuite2.API.Features.AgendaManager.Suggestions;
using AMSuite2.Entities.DataClasses;
using AutoMapper;

namespace AMSuite2.API.Infrastructure.Mapper
{
    public class SuggestionMapProfile : Profile
    {
        public SuggestionMapProfile()
        {
            CreateMap<Suggestion, SuggestionModel>();

            CreateMap<SuggestionModel, Suggestion>();
        }
    }
}
