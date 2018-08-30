using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection.Metadata.Ecma335;
using System.Threading.Tasks;
using AMSuite2.API.Infrastructure.Models;
using AMSuite2.API.Infrastructure.Repositories;
using Remotion.Linq.Clauses;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;

namespace AMSuite2.API.Infrastructure.Controllers
{
    public class BaseController : Controller
    {
        protected int UserId
        {
            get
            {
                var userIdclaim = User?.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier);
                if (userIdclaim != null)
                {
                    int userIdInt = 0;
                    Int32.TryParse(userIdclaim.Value, out userIdInt);
                    return userIdInt;
                }
                return 0;
            }
        }

        protected ActionResult Delete(Action<int> f, int id)
        {
            try
            {
                f(id);
            }
            catch
            {
                return StatusCode(500, "A problem occurred while handling your request.");
            }

            return NoContent();
        }

        protected ActionResult Delete(Action<int, int> f, int id1, int id2)
        {
            try
            {
                f(id1, id2);
            }
            catch
            {
                return StatusCode(500, "A problem occurred while handling your request.");
            }

            return NoContent();
        }

        protected ActionResult Get<T>(Func<T> f)
        {
            var result = f();
            return Ok(result);
        }

        protected ActionResult Get<T>(Func<IEnumerable<T>> f)
        {
            var result = f();
            return Ok(result);
        }
        protected ActionResult Get<T>(Func<IQueryModel<T>, IEnumerable<T>> f, IQueryModel<T> query = null)
        {
            var result = f(query);
            return Ok(result);
        }

        protected ActionResult Get<T>(Func<QueryModel<T>, SearchResults<T>> f, QueryModel<T> query = null)
        {
            var result = f(query);
            return Ok(result);
        }

        protected ActionResult Get<T>(Func<int, T> f, int id)
        {
            var result = f(id);
            return Ok(result);
        }

        protected ActionResult Get<T>(Func<int, int, T> f, int id1, int id2)
        {
            var result = f(id1, id2);
            return Ok(result);
        }

        //protected ActionResult Get<T>(Func<int, QueryModel<T>, IEnumerable<T>> f, int id, QueryModel<T> query = null)
        //{
        //    var result = f(id, query);
        //    return Ok(result);
        //}

        protected ActionResult Get<T>(Func<int, QueryModel<T>, SearchResults<T>> f, int id, QueryModel<T> query = null)
        {
            var result = f(id, query);
            return Ok(result);
        }

        protected ActionResult Post<T>(Func<T, object> f, T value)
        {
            var result = f(value);
            return Ok(result);
        }

        protected ActionResult Post<T>(Func<T, T> f, T value, string routeName) where T : IEntity
        {
            var result = f(value);
            return CreatedAtRoute(routeName, new { id = result.Id }, result);
        }

        protected ActionResult Post<T>(Func<T, T> f, T value, string routeName, Func<T, int> getId)
        {
            var result = f(value);
            return CreatedAtRoute(routeName, new { id = getId(result) }, result);
        }

        protected ActionResult Post<T>(Func<T, T> f, T value, string routeName, Func<T, object> getRouteValues)
        {
            var result = f(value);
            return CreatedAtRoute(routeName, getRouteValues(result), result);
        }

        protected ActionResult Post<T>(Func<int, IEnumerable<T>, IEnumerable<T>> f, int id, IEnumerable<T> value, string routeName) where T : IEntity
        {
            var results = f(id, value);
            return Ok(results);
        }

        protected ActionResult Post<T>(Func<IEnumerable<T>, IEnumerable<T>> f, IEnumerable<T> value, string routeName)
        {
            var results = f(value);
            return Ok(results);
        }

        protected ActionResult Post<T>(Func<int, T, T> f, int id, T value, string routeName)
        {
            var result = f(id, value);
            return Ok(result);
        }

        protected ActionResult Put<T>(Func<T, T> f, T value)
        {
            var result = f(value);
            return Ok(result);
        }

        protected ActionResult Put<T>(Func<int, T, T> f, int id, T value)
        {
            var result = f(id, value);
            return Ok(result);
        }

        protected T AuditNew<T>(T model) where T : BaseEntity
        {
            model.CreatedBy = UserId;
            model.CreatedDate = DateTime.Now;
            return model;
        }

        protected T AuditExisting<T>(T model) where T : BaseEntity
        {
            model.LastModifiedBy = UserId;
            model.LastModifiedDate = DateTime.Now;
            return model;
        }

        protected T Audit<T>(T model) where T : BaseEntity
        {
            return AuditExisting(AuditNew(model));
        }

        protected async Task<ActionResult> Upload<T>(Func<byte[], string, string, Task<T>> f, IFormFile file)
        {
            return Ok(await UploadFile(f, file));
        }

        protected async Task<ActionResult> Upload<T>(Func<byte[], string, string, Task<T>> f, IFormFileCollection files)
        {
            return Ok(files.Select(async file => await UploadFile(f, file)));
        }

        protected async Task<T> UploadFile<T>(Func<byte[], string, string, Task<T>> f, IFormFile file)
        {
            if (file == null) throw new Exception("File is null");
            if (file.Length == 0) throw new Exception("File is empty");

            using (Stream stream = file.OpenReadStream())
            {
                using (var binaryReader = new BinaryReader(stream))
                {
                    var fileContent = binaryReader.ReadBytes((int)file.Length);
                    return await f(fileContent, file.FileName, file.ContentType);
                }
            }
        }
    }
}
