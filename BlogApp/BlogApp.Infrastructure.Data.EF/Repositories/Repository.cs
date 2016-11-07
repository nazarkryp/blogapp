using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

using BlogApp.Entities;

namespace BlogApp.Infrastructure.Data.EF.Repositories
{
    public class Repository<T> : IRepository<T> where T : class, IKeyed<int>
    {
        private readonly BlogAppDbContext context;

        public Repository(BlogAppDbContext context)
        {
            this.context = context;
        }


        public IQueryable<T> Get()
        {
            return this.context.Set<T>();
        }

        public T GetById(int id)
        {
            return this.context.Set<T>().FirstOrDefault();
        }

        public Task<T> FindAsync(Expression<Func<T, bool>> predicate)
        {
            return this.context.Set<T>().FirstOrDefaultAsync(predicate);
        }

        public void Add(T entity)
        {
            this.context.Set<T>().Add(entity);
        }

        public void Update(T entity)
        {
            var entry = this.context.Entry(entity);

            entry.State = EntityState.Modified;
        }

        public void Delete(int id)
        {
            var entity = this.context.Set<T>().FirstOrDefault();

            if (entity == null)
            {
                throw new Exception($"Entity with '{id}' not found.");
            }

            this.context.Set<T>().Remove(entity);
        }

        public void Delete(T entity)
        {
            this.context.Set<T>().Remove(entity);
        }

        public void DeleteRange(IEnumerable<int> ids)
        {
            var entities = this.context.Set<T>().Where(e => ids.Contains(e.Id));

            this.context.Set<T>().RemoveRange(entities);
        }

        public void DeleteRange(IEnumerable<T> entities)
        {
            this.context.Set<T>().RemoveRange(entities);
        }

        public Task<int> SaveAsync()
        {
            return this.context.SaveChangesAsync();
        }
    }
}
