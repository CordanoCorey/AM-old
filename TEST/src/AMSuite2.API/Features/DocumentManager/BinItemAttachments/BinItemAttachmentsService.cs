using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AMSuite2.API.Features.DocumentManager.BinItemAttachments
{
    public interface IBinItemAttachmentsService
    {
        IEnumerable<BinItemAttachmentModel> GetBinItemAttachments(int binItemId);
    }

    public class BinItemAttachmentsService : IBinItemAttachmentsService
    {
        private readonly IBinItemAttachmentsRepository _repo;

        public BinItemAttachmentsService(IBinItemAttachmentsRepository repo)
        {
            _repo = repo;
        }

        public IEnumerable<BinItemAttachmentModel> GetBinItemAttachments(int binItemId)
        {
            return _repo.FindByBinItem(binItemId);
        }
    }
}
