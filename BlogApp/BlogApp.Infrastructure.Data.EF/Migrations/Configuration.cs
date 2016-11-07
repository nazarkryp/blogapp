namespace BlogApp.Infrastructure.Data.EF.Migrations
{
    using System.Data.Entity.Migrations;

    internal sealed class Configuration : DbMigrationsConfiguration<BlogAppDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = true;
            ContextKey = "BlogApp.Infrastructure.Data.EF.BlogAppDbContext";
        }

        protected override void Seed(BlogAppDbContext context)
        {
        }
    }
}
