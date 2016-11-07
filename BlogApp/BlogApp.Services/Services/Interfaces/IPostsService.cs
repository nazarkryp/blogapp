using System.Collections.Generic;
using System.Threading.Tasks;

using BlogApp.ViewModels;

namespace BlogApp.Services.Services
{
    public interface IPostsService
    {
        Task<IEnumerable<PostViewModel>> GetPostsAsync(int userId);
        Task<IEnumerable<PostViewModel>> GetUserPostsAsync(int userId, int ownerId);
        Task<PostViewModel> CreatePost(PostViewModel post, int ownerId);
        Task<PostViewModel> LikeAsync(int postId, int userId);
    }
}
