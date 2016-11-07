using System;
using System.Threading.Tasks;

using BlogApp.Entities;
using BlogApp.Infrastructure.Data.EF.Repositories;

namespace BlogApp.Infrastructure.Data.EF.Uow
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly BlogAppDbContext context = new BlogAppDbContext();

        private bool disposed;

        public IRepository<Post> PostsRepository => new Repository<Post>(this.context);
        public IRepository<User> UsersRepository => new Repository<User>(this.context);
        public IRepository<Comment> CommentsRepository => new Repository<Comment>(this.context);

        protected virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    this.context.Dispose();
                }
            }

            this.disposed = true;
        }

        public Task<int> SaveAsync()
        {
            return this.context.SaveChangesAsync();
        }

        public void Dispose()
        {
            this.Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}
