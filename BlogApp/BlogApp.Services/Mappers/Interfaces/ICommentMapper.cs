using BlogApp.Entities;
using BlogApp.ViewModels;

namespace BlogApp.Services.Mappers
{
    public interface ICommentMapper
    {
        Comment Map(CommentViewModel comment);
        CommentViewModel Map(Comment comment);
    }
}
