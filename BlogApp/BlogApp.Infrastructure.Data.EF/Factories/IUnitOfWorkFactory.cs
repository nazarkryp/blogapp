using BlogApp.Infrastructure.Data.EF.Uow;

namespace BlogApp.Infrastructure.Data.EF.Factories
{
    public interface IUnitOfWorkFactory
    {
        IUnitOfWork Create();
    }
}
