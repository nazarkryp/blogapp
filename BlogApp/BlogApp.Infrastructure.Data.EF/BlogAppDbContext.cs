using System.Data.Entity;

using BlogApp.Entities;
using BlogApp.Infrastructure.Data.EF.Migrations;

namespace BlogApp.Infrastructure.Data.EF
{
    public class BlogAppDbContext : DbContext
    {
        public BlogAppDbContext() : base("BlogAppDbContext")
        {
            Database.SetInitializer(new MigrateDatabaseToLatestVersion<BlogAppDbContext, Configuration>());
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Post> Posts { get; set; }
        public DbSet<Comment> Comments { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .HasMany(u => u.Followers)
                .WithMany().Map(m =>
                {
                    m.ToTable("UserFollowers");
                    m.MapLeftKey("UserId");
                    m.MapRightKey("FollowerId");
                });

            modelBuilder.Entity<User>()
                .HasMany(u => u.Following)
                .WithMany()
                .Map(f =>
                {
                    f.ToTable("UserFollowings");
                    f.MapLeftKey("UserId");
                    f.MapRightKey("FollowingId");
                });

            modelBuilder.Entity<Post>()
                .HasMany(p => p.Likes)
                .WithMany(u => u.Liked)
                    .Map(m =>
                {
                    m.ToTable("UserLiked");
                    m.MapLeftKey("PostId");
                    m.MapRightKey("UserId");
                });

            //modelBuilder.Entity<User>()
            //    .HasMany(u => u.Posts)
            //    .WithMany(p => p.Likes)
            //    .Map(m =>
            //    {
            //        m.ToTable("UserLiked");
            //        m.MapLeftKey("UserId");
            //        m.MapRightKey("PostId");
            //    });

            modelBuilder.Entity<User>()
                .HasMany(u => u.Posts)
                .WithRequired(p => p.Owner)
                .HasForeignKey(c => c.OwnerId)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<User>()
                .HasMany(u => u.Comments)
                .WithRequired(c => c.Owner)
                .HasForeignKey(c => c.OwnerId)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Post>()
                .HasMany(p => p.Comments)
                .WithRequired(c => c.Post)
                .HasForeignKey(c => c.PostId)
                .WillCascadeOnDelete(true);

            base.OnModelCreating(modelBuilder);
        }
    }
}
