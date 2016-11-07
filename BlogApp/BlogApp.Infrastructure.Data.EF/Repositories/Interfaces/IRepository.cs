using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace BlogApp.Infrastructure.Data.EF.Repositories
{
    public interface IRepository<T>
    {
        IQueryable<T> Get();
        T GetById(int id);
        Task<T> FindAsync(Expression<Func<T, bool>> predicate);
        void Add(T entity);
        void Update(T entity);
        void Delete(int id);
        void Delete(T entity);
        void DeleteRange(IEnumerable<int> ids);
        void DeleteRange(IEnumerable<T> entities);
        Task<int> SaveAsync();
    }
}
