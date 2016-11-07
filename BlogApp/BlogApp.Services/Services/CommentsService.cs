using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;

using BlogApp.Infrastructure.Data.EF.Factories;
using BlogApp.Services.Mappers;
using BlogApp.ViewModels;

namespace BlogApp.Services.Services
{
    public class CommentsService : ICommentsService
    {
        private readonly IUnitOfWorkFactory factory;
        private readonly ICommentMapper mapper;

        public CommentsService(IUnitOfWorkFactory factory, ICommentMapper mapper)
        {
            this.factory = factory;
            this.mapper = mapper;
        }

        public async Task<IEnumerable<CommentViewModel>> GetCommentsAsync(int postId)
        {
            using (var uow = this.factory.Create())
            {
                var entities = await uow.CommentsRepository.Get().Include(p => p.Owner).Where(p => p.PostId == postId).ToListAsync();

                return entities.Select(p => this.mapper.Map(p));
            }
        }

        public async Task<CommentViewModel> AddCommentAsync(CommentViewModel comment, int postId, int userId)
        {
            var entity = this.mapper.Map(comment);

            using (var uow = this.factory.Create())
            {
                var post = await uow.PostsRepository.Get().FirstOrDefaultAsync(p => p.Id == postId);

                if (post == null)
                {
                    throw new Exception("Post not found");
                }

                entity.PostId = postId;
                entity.OwnerId = userId;
                entity.Date = DateTime.Now;

                uow.CommentsRepository.Add(entity);

                await uow.SaveAsync();

                entity = await uow.CommentsRepository.Get().Include(c => c.Owner).FirstOrDefaultAsync(c=>c.Id == entity.Id);
            }

            return mapper.Map(entity);
        }
    }
}
