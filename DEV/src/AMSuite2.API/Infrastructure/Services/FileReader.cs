using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace AMSuite2.API.Infrastructure.Services
{
    public interface IFileReader
    {
        T ReadJson<T>(string path);
        string GetPath(string fileName);
        string GetPath(string fileName, string folderName);
    }

    public class FileReader : IFileReader
    {
        public string GetPath(string fileName)
        {
            var pathToFile =
                $" env.ApplicationBasePath { Path.DirectorySeparatorChar.ToString() } { fileName }";
            return pathToFile;
        }

        public string GetPath(string fileName, string folderName)
        {
            var pathToFile =
                $" env.ApplicationBasePath { Path.DirectorySeparatorChar.ToString() } { folderName } { Path.DirectorySeparatorChar.ToString() } { fileName }";
            return pathToFile;
        }

        public T ReadJson<T>(string path)
        {
            throw new NotImplementedException();
        }
    }
}
