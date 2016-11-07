using BlogApp.Entities;
using BlogApp.ViewModels;

namespace BlogApp.Services.Mappers
{
    public interface IUserMapper
    {
        UserViewModel Map(User user);
    }
}
