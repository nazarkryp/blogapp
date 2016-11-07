using System;
using System.Threading.Tasks;

using BlogApp.Entities;
using BlogApp.Infrastructure.Data.EF.Repositories;

namespace BlogApp.Infrastructure.Data.EF.Uow
{
    public interface IUnitOfWork : IDisposable
    {
        IRepository<Post> PostsRepository { get; }
        IRepository<User> UsersRepository { get; }
        IRepository<Comment> CommentsRepository { get; }

        Task<int> SaveAsync();
    }
}
