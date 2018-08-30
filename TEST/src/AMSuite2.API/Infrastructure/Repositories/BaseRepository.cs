using AMSuite2.API.Infrastructure.Models;
using AMSuite2.Entities.DataClasses;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using AMSuite2.Entities.Context;
using System.Reflection;

namespace AMSuite2.API.Infrastructure.Repositories
{
    public interface IBaseRepository<TEntity, TModel>
    {
        IEnumerable<TModel> All();
        IEnumerable<TModel> AllInclude
            (params Expression<Func<TEntity, object>>[] includeProperties);
        /**
         * Count all records in table
         */
        int Count();
        void Delete(int id);
        void Delete(IEnumerable<int> ids);
        void DeleteUnsaved(int id);
        IEnumerable<TModel> FindBy(QueryModel<TModel> query);
        IEnumerable<TModel> FindBy(QueryModel<TModel> query, Expression<Func<TEntity, bool>> predicate);
        IEnumerable<TModel> Query(IEnumerable<TModel> model, QueryModel<TModel> query);
        IEnumerable<TModel> FindBy(Expression<Func<TEntity, bool>> predicate);
        IEnumerable<TModel> FindByInclude(Expression<Func<TEntity, bool>> predicate, params Expression<Func<TEntity, object>>[] includeProperties);
        TModel FindByKeyInclude(int key, params Expression<Func<TEntity, object>>[] includeProperties);
        TModel FindByKey(int id);
        TModel FindByKey(int id, string keyType);
        TModel FindByKey(string val, string key);
        IEnumerable<TModel> FindByKeys(Dictionary<string, int> keys);
        TModel FindSingle(Expression<Func<TEntity, bool>> lambda);
        TModel Insert(TModel model);
        void Insert(IEnumerable<TModel> model);
        void InsertUnsaved(TModel model);
        IEnumerable<TModel> Map(IEnumerable<TEntity> entities);
        TModel Map(TEntity entity);
        IEnumerable<TEntity> Map(IEnumerable<TModel> models);
        TEntity Map(TModel model);
        void Save();
        TModel Update(TModel model);
        TEntity UpdateUnsaved(TModel model);
        IEnumerable<TModel> Update(IEnumerable<TModel> model);
        IEnumerable<TEntity> UpdateUnsaved(IEnumerable<TModel> model);
    }
    public class BaseRepository<TEntity, TModel> : IBaseRepository<TEntity, TModel> where TEntity : class
    {
        protected readonly AMSuiteContext _context;
        protected readonly IMapper _mapper;
        protected readonly DbSet<TEntity> _dbSet;

        public BaseRepository(AMSuiteContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
            _dbSet = context.Set<TEntity>();
        }

        public IQueryable<TEntity> BaseDbSet => _dbSet.AsNoTracking();
        public virtual IQueryable<TEntity> DbSetAll => IncludeAll(_dbSet.AsNoTracking());
        public virtual IQueryable<TEntity> DbSet => Include(_dbSet.AsNoTracking());
        public virtual IQueryable<TEntity> DbSetSingle => IncludeSingle(_dbSet.AsNoTracking());

        public virtual IEnumerable<TModel> All()
        {
            var result = DbSetAll.ToList();
            return result.Select(Map);
        }

        protected IEnumerable<TEntity> AllEntities()
        {
            return DbSetAll.ToList();
        }

        public virtual IEnumerable<TModel> FindBy(QueryModel<TModel> query)
        {
            IEnumerable<TModel> results = DbSet.ToList().Select(Map);
            return Query(results, query);
        }

        public virtual IEnumerable<TModel> FindBy(QueryModel<TModel> query, Expression<Func<TEntity, bool>> predicate)
        {
            IEnumerable<TModel> results = DbSet.Where(predicate).ToList().Select(Map);
            return Query(results, query);
        }

        public IEnumerable<TModel> Query(IEnumerable<TModel> model, QueryModel<TModel> query)
        {
            var filteredResults = model.Where(query.Predicate);
            var orderedResults = query.OrderBy == null ? filteredResults : filteredResults.OrderBy(query.OrderBy);
            return orderedResults
                .Skip(query.Skip)
                .Take(query.Take);
        }

        public IEnumerable<TModel> FindBy(Expression<Func<TEntity, bool>> predicate)
        {
            IEnumerable<TEntity> results = DbSet.Where(predicate).ToList();
            return results.Select(Map);
        }

        protected IEnumerable<TEntity> FindEntitiesBy(Expression<Func<TEntity, bool>> predicate)
        {
            return DbSet.Where(predicate).ToList();
        }

        public TModel FindByKey(int id)
        {
            Expression<Func<TEntity, bool>> lambda = Utils.BuildLambdaForFindByKey<TEntity>(id);
            TEntity result = DbSetSingle.SingleOrDefault(lambda);
            return Map(result);
        }

        protected TEntity FindEntityByKey(int id)
        {
            var lambda = Utils.BuildLambdaForFindByKey<TEntity>(id);
            return DbSetSingle.SingleOrDefault(lambda);
        }

        public TModel FindByKey(int id, string keyType)
        {
            Expression<Func<TEntity, bool>> lambda = Utils.BuildLambdaForFindByKey<TEntity>(id, keyType);
            TEntity result = DbSetSingle.SingleOrDefault(lambda);
            return Map(result);
        }

        protected TEntity FindEntityByKey(int id, string keyType)
        {
            var lambda = Utils.BuildLambdaForFindByKey<TEntity>(id, keyType);
            return DbSetSingle.SingleOrDefault(lambda);
        }

        public TModel FindByKey(string val, string key)
        {
            Expression<Func<TEntity, bool>> lambda = Utils.BuildLambdaForFindByKey<TEntity>(val, key);
            TEntity result = DbSetSingle.SingleOrDefault(lambda);
            return Map(result);
        }

        protected TEntity FindEntityByKey(string val, string key)
        {
            var lambda = Utils.BuildLambdaForFindByKey<TEntity>(val, key);
            return DbSetSingle.SingleOrDefault(lambda);
        }
        public TModel FindSingle(Expression<Func<TEntity, bool>> lambda)
        {
            TEntity result = DbSetSingle.SingleOrDefault(lambda);
            return Map(result);
        }

        protected virtual IQueryable<TEntity> Include(IQueryable<TEntity> queryable)
        {
            return queryable;
        }

        protected virtual IQueryable<TEntity> IncludeAll(IQueryable<TEntity> queryable)
        {
            return queryable;
        }

        protected virtual IQueryable<TEntity> IncludeSingle(IQueryable<TEntity> queryable)
        {
            return queryable;
        }

        public TModel Insert(TModel model)
        {
            TEntity entity = _mapper.Map<TEntity>(model);
            _dbSet.Add(entity);
            Save();
            return Map(entity);
        }

        public void Insert(IEnumerable<TModel> model)
        {
            foreach (TModel item in model)
            {
                TEntity entity = _mapper.Map<TEntity>(item);
                _dbSet.Add(entity);
            }
            Save();
        }

        public void InsertUnsaved(TModel model)
        {
            TEntity entity = _mapper.Map<TEntity>(model);
            _dbSet.Add(entity);
        }

        public virtual TModel Update(TModel model)
        {
            TEntity entity = _mapper.Map<TEntity>(model);
            //_dbSet.Attach(entity);
            _context.Entry(entity).State = EntityState.Modified;
            Save();
            return _mapper.Map<TModel>(entity);
        }

        public TEntity UpdateUnsaved(TModel model)
        {
            TEntity entity = _mapper.Map<TEntity>(model);
            _dbSet.Attach(entity);
            _context.Entry(entity).State = EntityState.Modified;
            return entity;
        }

        public IEnumerable<TModel> Update(IEnumerable<TModel> model)
        {
            var results = model.Select(x => UpdateUnsaved(x));
            Save();
            return results.Select(Map);
        }

        public IEnumerable<TEntity> UpdateUnsaved(IEnumerable<TModel> model)
        {
            return model.Select(x => UpdateUnsaved(x));
        }

        public void Delete(int id)
        {
            var entity = FindEntityByKey(id);
            _dbSet.Remove(entity);
            Save();
        }

        public void Delete(IEnumerable<int> ids)
        {
            foreach (int id in ids)
            {
                var entity = FindEntityByKey(id);
                _dbSet.Remove(entity);
            }
            Save();
        }

        public void DeleteUnsaved(int id)
        {
            var entity = FindEntityByKey(id);
            _dbSet.Remove(entity);
        }

        public IEnumerable<TModel> AllInclude
            (params Expression<Func<TEntity, object>>[] includeProperties)
        {
            IEnumerable<TEntity> results = GetAllIncluding(includeProperties).ToList();
            return results.Select(Map);
        }

        public IEnumerable<TModel> FindByInclude(Expression<Func<TEntity, bool>> predicate,
            params Expression<Func<TEntity, object>>[] includeProperties)
        {
            var query = GetAllIncluding(includeProperties);
            IEnumerable<TEntity> results = query.Where(predicate).ToList();
            return results.Select(x => _mapper.Map<TModel>(x));
        }

        public TModel FindByKeyInclude(int key,
            params Expression<Func<TEntity, object>>[] includeProperties)
        {
            var query = GetAllIncluding(includeProperties);
            Expression<Func<TEntity, bool>> lambda = Utils.BuildLambdaForFindByKey<TEntity>(key);
            TEntity result = query.SingleOrDefault(lambda);
            return _mapper.Map<TModel>(result);
        }

        protected IQueryable<TEntity> GetAllIncluding
            (params Expression<Func<TEntity, object>>[] includeProperties)
        {
            IQueryable<TEntity> queryable = _dbSet.AsNoTracking();

            return includeProperties.Aggregate(queryable,
                (current, includeProperty) => current.Include(includeProperty));
        }

        public IEnumerable<TModel> Map(IEnumerable<TEntity> entities)
        {
            return entities.Select(Map);
        }

        public virtual TModel Map(TEntity entity)
        {
            return _mapper.Map<TModel>(entity);
        }

        public IEnumerable<TEntity> Map(IEnumerable<TModel> models)
        {
            return models.Select(Map);
        }

        public virtual TEntity Map(TModel model)
        {
            return _mapper.Map<TEntity>(model);
        }

        public void Save()
        {
            _context.SaveChanges();
        }

        public IEnumerable<TModel> FindByKeys(Dictionary<string, int> keys)
        {
            Expression<Func<TEntity, bool>> lambda = Utils.BuildLambdaForFindByKeys<TEntity>(keys);
            IEnumerable<TEntity> result = DbSet.Where(lambda);
            return result.Select(Map);
        }

        public int Count()
        {
            return All().Count();
        }
    }
}
