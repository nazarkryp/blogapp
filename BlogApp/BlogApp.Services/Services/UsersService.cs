using System.Threading.Tasks;

using BlogApp.Entities;
using BlogApp.Infrastructure.Data.EF.Factories;

namespace BlogApp.Services.Services
{
    public class UsersService : IUsersService
    {
        private readonly IUnitOfWorkFactory factory;

        public UsersService(IUnitOfWorkFactory factory)
        {
            this.factory = factory;
        }

        public async Task<User> GetUserByIdAsync(int id)
        {
            using (var uow = this.factory.Create())
            {
                return await uow.UsersRepository.FindAsync(u => u.Id == id);
            }
        }

        public async Task<User> GetUserByNameAsync(string username)
        {
            using (var uow = this.factory.Create())
            {
                return await uow.UsersRepository.FindAsync(u=>u.Username == username);
            }
        }

        public async Task<User> CreateUserAsync(User user)
        {
            using (var uow = this.factory.Create())
            {
                uow.UsersRepository.Add(user);

                await uow.SaveAsync();

                return user;
            }
        }
    }
}
