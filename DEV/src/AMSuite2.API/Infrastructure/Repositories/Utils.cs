using AMSuite2.API.Infrastructure.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using System.Threading.Tasks;

namespace AMSuite2.API.Infrastructure.Repositories
{
    public static class Utils
    {
        public static Expression<Func<TEntity, bool>> BuildLambda<TEntity>(string key, dynamic val)
        {
            var item = Expression.Parameter(typeof(TEntity), "entity");
            var prop = Expression.Property(item, key);
            var value = Expression.Constant(val);
            var equal = Expression.Equal(prop, value);
            var lambda = Expression.Lambda<Func<TEntity, bool>>(equal, item);
            return lambda;
        }

        public static Expression<Func<TEntity, bool>> BuildLambdaForFindByKey<TEntity>(int id)
        {
            var hasId = typeof(TEntity).GetProperty("Id") != null;
            var item = Expression.Parameter(typeof(TEntity), "entity");
            var key = hasId ? "Id" : typeof(TEntity).Name + "Id";
            var prop = Expression.Property(item, key);
            var value = Expression.Constant(id);
            var equal = Expression.Equal(prop, value);
            var lambda = Expression.Lambda<Func<TEntity, bool>>(equal, item);
            return lambda;
        }

        public static Expression<Func<TEntity, bool>> BuildLambdaForFindByKey<TEntity>(int id, string keyType)
        {
            var item = Expression.Parameter(typeof(TEntity), "entity");
            var key = keyType + "Id";
            var prop = Expression.Property(item, key);
            var value = Expression.Constant(id);
            var equal = Expression.Equal(prop, value);
            var lambda = Expression.Lambda<Func<TEntity, bool>>(equal, item);
            return lambda;
        }

        public static Expression<Func<TEntity, bool>> BuildLambdaForFindByKey<TEntity>(string val, string key)
        {
            var item = Expression.Parameter(typeof(TEntity), "entity");
            var prop = Expression.Property(item, key);
            var value = Expression.Constant(val);
            var equal = Expression.Equal(prop, value);
            var lambda = Expression.Lambda<Func<TEntity, bool>>(equal, item);
            return lambda;
        }

        public static Expression<Func<TEntity, bool>> BuildLambdaForFindByKeys<TEntity>(Dictionary<string, int> keys)
        {
            IEnumerable<Expression<Func<TEntity, bool>>> expressions = 
                (from pair in keys let key = pair.Key let value = pair.Value select Utils.BuildLambda<TEntity>(key, value)).ToList();
            var lambda = expressions.Aggregate(Utils.AndAlso<TEntity>);
            return lambda;
        }

        public static Expression<Func<TEntity, bool>> And<TEntity>(Expression<Func<TEntity, bool>> left,
            Expression<Func<TEntity, bool>> right)
        {
            var item = Expression.Parameter(typeof(TEntity), "entity");
            var and = Expression.And((Expression)left, (Expression)right);
            var lambda = Expression.Lambda<Func<TEntity, bool>>(and, item);
            return lambda;
        }

        public static Expression<Func<TEntity, bool>> And<TEntity>(Func<TEntity, bool> f1,
            Func<TEntity, bool> f2)
        {
            var item = Expression.Parameter(typeof(TEntity), "entity");
            Expression<Func<TEntity, bool>> left = x => f1(x);
            Expression<Func<TEntity, bool>> right = x => f2(x);
            var and = Expression.And(left, right);
            var lambda = Expression.Lambda<Func<TEntity, bool>>(and, item);
            return lambda;
        }

        public static Expression<Func<TEntity, bool>> AndAlso<TEntity>(Expression<Func<TEntity, bool>> expr1,
            Expression<Func<TEntity, bool>> expr2)
        {
            var invokedExpr = Expression.Invoke(expr2, expr1.Parameters.Cast<Expression>());
            var lambda = (Expression.Lambda<Func<TEntity, bool>>(Expression.AndAlso(expr1.Body, invokedExpr), expr1.Parameters));
            return lambda;
        }

        public static Expression<Func<TEntity, bool>> Or<TEntity>(Expression<Func<TEntity, bool>> left,
            Expression<Func<TEntity, bool>> right)
        {
            var item = Expression.Parameter(typeof(TEntity), "entity");
            var or = Expression.Or(left, right);
            var lambda = Expression.Lambda<Func<TEntity, bool>>(or, item);
            return lambda;
        }

        public static bool IsAny<T>(this IEnumerable<T> data)
        {
            return data != null && data.Any();
        }
    }
}
