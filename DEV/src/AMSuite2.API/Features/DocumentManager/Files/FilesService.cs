using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AMSuite2.API.Infrastructure.Models;

namespace AMSuite2.API.Features.DocumentManager.Files
{
    public interface IFilesService
    {
        SearchResults<FileModel> GetFiles(QueryModel<FileModel> query);
        FileModel GetFile(int id);
        FileModel AddFile(FileModel file);
        FileModel UpdateFile(FileModel file);
        void DeleteFile(int id);
    }

    public class FilesService : IFilesService
    {
        public FileModel AddFile(FileModel file)
        {
            throw new NotImplementedException();
        }

        public void DeleteFile(int id)
        {
            throw new NotImplementedException();
        }

        public FileModel GetFile(int id)
        {
            throw new NotImplementedException();
        }

        public SearchResults<FileModel> GetFiles(QueryModel<FileModel> query)
        {
            throw new NotImplementedException();
        }

        public FileModel UpdateFile(FileModel file)
        {
            throw new NotImplementedException();
        }
    }
}
