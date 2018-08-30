using AMSuite2.API.Infrastructure.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AMSuite2.Entities.DataClasses;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System.Reflection;
using AMSuite2.Entities.Context;

namespace AMSuite2.API.Infrastructure.Lookup
{
    public interface ILookupRepository
    {
        IEnumerable<LookupValueModel> GetValues(string key);
    }
    public class LookupRepository : ILookupRepository
    {
        protected readonly AMSuiteContext _context;
        protected readonly IMapper _mapper;
        private readonly LookupContext _lookupContext = new LookupContext();

        public LookupRepository(AMSuiteContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
            _lookupContext.AccountStatuses = context.Set<AccountStatusLkp>();
            _lookupContext.Agendas = context.Set<AgendaLkp>();
            _lookupContext.DateRanges = context.Set<AgendaDateRangeLkp>();
            _lookupContext.GroupRoles = context.Set<GroupRoleLkp>();
            _lookupContext.NotificationStatuses = context.Set<NotificationStatusLkp>();
            _lookupContext.NotificationTypes = context.Set<NotificationTypeLkp>();
            _lookupContext.Outlines = context.Set<OutlineLkp>();
            _lookupContext.UserRoles = context.Set<RoleLkp>();
            _lookupContext.VoteAnswers = context.Set<VoteAnswerLkp>();
        }

        public IEnumerable<LookupValueModel> GetValues(string key)
        {
            switch (key)
            {
                case "AccountStatuses":
                    return _lookupContext.AccountStatuses.Select(x => _mapper.Map<LookupValueModel>(x));

                case "Agendas":
                    return _lookupContext.Agendas.Select(x => _mapper.Map<LookupValueModel>(x));

                case "DateRanges":
                    return _lookupContext.DateRanges.Select(x => _mapper.Map<LookupValueModel>(x));

                case "GroupRoles":
                    return _lookupContext.GroupRoles.Select(x => _mapper.Map<LookupValueModel>(x));

                case "NotificationStatuses":
                    return _lookupContext.NotificationStatuses.Select(x => _mapper.Map<LookupValueModel>(x));

                case "NotificationTypes":
                    return _lookupContext.NotificationTypes.Select(x => _mapper.Map<LookupValueModel>(x));

                case "Outlines":
                    return _lookupContext.Outlines.Select(x => _mapper.Map<LookupValueModel>(x));

                case "UserRoles":
                    return _lookupContext.UserRoles.Select(x => _mapper.Map<LookupValueModel>(x));

                case "VoteAnswers":
                    return _lookupContext.VoteAnswers.Select(x => _mapper.Map<LookupValueModel>(x));

                default:
                    return null;
            }
        }
    }
}
