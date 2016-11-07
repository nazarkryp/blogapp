using System.Threading.Tasks;

using BlogApp.Entities;

namespace BlogApp.Services.Services
{
    public interface IUsersService
    {
        Task<User> GetUserByIdAsync(int id);
        Task<User> GetUserByNameAsync(string username);
        Task<User> CreateUserAsync(User user);
    }
}
