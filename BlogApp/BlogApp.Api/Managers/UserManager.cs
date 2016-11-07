using System;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using BlogApp.Entities;
using BlogApp.Services.Services;
using BlogApp.ViewModels;

namespace BlogApp.Api.Managers
{
    public class UserManager
    {
        private readonly IUsersService service;

        public UserManager(IUsersService service)
        {
            this.service = service;
        }

        public async Task<UserViewModel> GetUserAsync(string username, string password)
        {
            var user = await this.service.GetUserByNameAsync(username);

            if (user == null)
            {
                throw new Exception("User with such username or password not found");
            }

            if (!CompareMd5Hashes(user.Password, password))
            {
                throw new Exception("User with such username or password not found");
            }

            return new UserViewModel
            {
                Id = user.Id,
                Username = user.Username
            };
        }

        public async Task<User> CreateUserAsync(string username, string password)
        {
            var user = await this.service.GetUserByNameAsync(username);

            if (user != null)
            {
                throw new Exception("Username has been already taken");
            }

            var passwordHash = GetMd5Hash(password);

            return await this.service.CreateUserAsync(new User
            {
                Username = username,
                Password = passwordHash
            });
        }

        private static string GetMd5Hash(string input)
        {
            using (var md5 = MD5.Create())
            {
                var data = md5.ComputeHash(Encoding.UTF8.GetBytes(input));

                var builder = new StringBuilder();

                foreach (var b in data)
                {
                    builder.Append(b.ToString("x2"));
                }

                return builder.ToString();
            }
        }

        private static bool CompareMd5Hashes(string passwordHash, string input)
        {
            var inputHash = GetMd5Hash(input);

            var comparer = StringComparer.OrdinalIgnoreCase;

            return comparer.Compare(passwordHash, inputHash) == 0;
        }
    }
}