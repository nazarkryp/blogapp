using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Core;
using System.Linq;
using System.Threading.Tasks;

using BlogApp.Infrastructure.Data.EF.Factories;
using BlogApp.Services.Mappers;
using BlogApp.ViewModels;

namespace BlogApp.Services.Services
{
    public class PostsService : IPostsService
    {
        private readonly IUnitOfWorkFactory factory;
        private readonly IPostMapper mapper;

        public PostsService(IUnitOfWorkFactory factory, IPostMapper mapper)
        {
            this.factory = factory;
            this.mapper = mapper;
        }

        public async Task<IEnumerable<PostViewModel>> GetPostsAsync(int userId)
        {
            IEnumerable<PostViewModel> posts;

            using (var uow = this.factory.Create())
            {
                if (userId > 0)
                {
                    var user = await uow.UsersRepository.FindAsync(u => u.Id == userId);

                    if (user == null)
                    {
                        throw new ObjectNotFoundException("User not found");
                    }
                }

                var entities = await
                    uow.PostsRepository.Get()
                        .Include(p => p.Likes)
                        .Include(p => p.Comments)
                        .Include(p => p.Owner)
                        .OrderByDescending(p=>p.Created)
                        .ToListAsync();

                posts = entities.Select(e => mapper.Map(e, userId));
            }

            return posts;
        }

        public async Task<IEnumerable<PostViewModel>> GetUserPostsAsync(int userId, int ownerId)
        {
            IEnumerable<PostViewModel> posts;

            using (var uow = this.factory.Create())
            {

                var user = await uow.UsersRepository.FindAsync(u => u.Id == ownerId);

                if (user == null)
                {
                    throw new ObjectNotFoundException("User not found");
                }

                var entities = await
                    uow.PostsRepository.Get()
                        .Where(p => p.OwnerId == ownerId)
                        .Include(p => p.Likes)
                        .Include(p => p.Comments)
                        .Include(p => p.Owner)
                        .OrderByDescending(p => p.Created)
                        .ToListAsync();

                posts = entities.Select(e => mapper.Map(e, userId));
            }

            return posts;
        }

        public async Task<PostViewModel> CreatePost(PostViewModel post, int userId)
        {
            var entity = mapper.Map(post);

            using (var uow = this.factory.Create())
            {
                entity.OwnerId = userId;
                entity.Created = DateTime.Now;
                uow.PostsRepository.Add(entity);

                await uow.SaveAsync();

                entity = await uow.PostsRepository.Get().Include(p => p.Owner).FirstOrDefaultAsync(p => p.Id == entity.Id);
            }

            return mapper.Map(entity, userId);
        }

        public async Task<PostViewModel> LikeAsync(int postId, int userId)
        {
            using (var uow = this.factory.Create())
            {
                var post = await uow.PostsRepository.Get()
                    .Include(p => p.Likes)
                    .FirstOrDefaultAsync(p => p.Id == postId);

                if (post == null)
                {
                    throw new ObjectNotFoundException("Post not found");
                }

                var user = await uow.UsersRepository.FindAsync(p => p.Id == userId);

                if (!post.Likes.Contains(user))
                {
                    post.Likes.Add(user);
                }
                else
                {
                    post.Likes.Remove(user);
                }

                await uow.SaveAsync();

                return this.mapper.Map(post, userId);
            }
        }
    }
}
