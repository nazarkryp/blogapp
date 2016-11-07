using System.Web.Http;

using BlogApp.Infrastructure.Data.EF.Factories;
using BlogApp.Services.Mappers;
using BlogApp.Services.Services;

using Microsoft.Practices.Unity;
using Unity.WebApi;

namespace BlogApp.Api
{
    public static class UnityConfig
    {
        private static readonly UnityContainer Container = new UnityContainer();

        public static void RegisterComponents(HttpConfiguration config)
        {
            Container.RegisterType<IUnitOfWorkFactory, UnitOfWorkFactory>();

            Container.RegisterType<IPostsService, PostsService>();
            Container.RegisterType<IUsersService, UsersService>();

            Container.RegisterType<IUserMapper, UserMapper>();
            Container.RegisterType<IPostMapper, PostMapper>();

            Container.RegisterType<ICommentsService, CommentsService>();
            Container.RegisterType<ICommentMapper, CommentMapper>();

            config.DependencyResolver = new UnityDependencyResolver(Container);
        }

        public static T Resolve<T>()
        {
            return Container.Resolve<T>();
        }
    }
}