using System.Collections.Generic;
using System.Threading.Tasks;

using BlogApp.ViewModels;

namespace BlogApp.Services.Services
{
    public interface ICommentsService
    {
        Task<IEnumerable<CommentViewModel>> GetCommentsAsync(int postId);
        Task<CommentViewModel> AddCommentAsync(CommentViewModel comment, int postId, int userId);
    }
}
