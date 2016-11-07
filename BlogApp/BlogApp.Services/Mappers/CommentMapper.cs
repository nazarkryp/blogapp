using BlogApp.Entities;
using BlogApp.ViewModels;

namespace BlogApp.Services.Mappers
{
    public class CommentMapper : ICommentMapper
    {
        private readonly IUserMapper userMapper;

        public CommentMapper(IUserMapper userMapper)
        {
            this.userMapper = userMapper;
        }

        public Comment Map(CommentViewModel comment)
        {
            return new Comment
            {
                Text = comment.Text
            };
        }

        public CommentViewModel Map(Comment comment)
        {
            var from = this.userMapper.Map(comment.Owner);

            return new CommentViewModel
            {
                Id = comment.Id,
                Text = comment.Text,
                Date = comment.Date,
                From = from
            };
        }
    }
}
