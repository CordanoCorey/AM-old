using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AMSuite2.API.Infrastructure.Repositories;
using AMSuite2.Entities.Context;
using AMSuite2.Entities.DataClasses;
using AutoMapper;

namespace AMSuite2.API.Features.DocumentManager.BinItemAttachments
{
    public interface IBinItemAttachmentsRepository
    {
        IEnumerable<BinItemAttachmentModel> FindByBinItem(int binItemId);
    }

    public class BinItemAttachmentsRepository : BaseRepository<BinAttachment, BinItemAttachmentModel>, IBinItemAttachmentsRepository
    {
        public BinItemAttachmentsRepository(AMSuiteContext context, IMapper mapper) : base(context, mapper)
        {
        }

        public IEnumerable<BinItemAttachmentModel> FindByBinItem(int binItemId)
        {
            return FindBy(x => x.BinAgendaItemId == binItemId);
        }
    }
}
