using BlogApp.Entities;
using BlogApp.ViewModels;

namespace BlogApp.Services.Mappers
{
    public class UserMapper : IUserMapper
    {
        public UserViewModel Map(User user)
        {
            return new UserViewModel
            {
                Id = user.Id,
                Username = user.Username,
                ProfileImageUri = user.ProfileImageUri
            };
        }
    }
}
