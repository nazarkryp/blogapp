using BlogApp.Infrastructure.Data.EF.Uow;

namespace BlogApp.Infrastructure.Data.EF.Factories
{
    public class UnitOfWorkFactory : IUnitOfWorkFactory
    {
        public IUnitOfWork Create()
        {
            return new UnitOfWork();
        }
    }
}
