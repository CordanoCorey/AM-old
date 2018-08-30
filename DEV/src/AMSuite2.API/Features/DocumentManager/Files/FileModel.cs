using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AMSuite2.API.Infrastructure.Models;

namespace AMSuite2.API.Features.DocumentManager.Files
{
    public class FileModel : BaseEntity, IEntity
    {
        public int Id { get; set; }
        public string FileName { get; set; }
        public int FileSize { get; set; }
        public byte[] FileBinary { get; set; }
        public string FileString { get; set; }
        public string FileExtension { get; set; }
        public string MimeType { get; set; }
    }
}
