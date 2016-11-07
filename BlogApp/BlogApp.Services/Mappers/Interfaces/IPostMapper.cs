using BlogApp.Entities;
using BlogApp.ViewModels;

namespace BlogApp.Services.Mappers
{
    public interface IPostMapper
    {
        Post Map(PostViewModel post);
        PostViewModel Map(Post post, int userId);
    }
}
