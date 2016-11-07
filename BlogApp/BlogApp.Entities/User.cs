using System.Collections.Generic;

namespace BlogApp.Entities
{
    public class User : IKeyed<int>
    {
        public User()
        {
            this.Posts = new List<Post>();
            this.Comments = new List<Comment>();
            this.Following = new List<User>();
            this.Followers = new List<User>();
        }

        public int Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string ProfileImageUri { get; set; }
        public virtual ICollection<Post> Posts { get; set; }
        public virtual ICollection<Comment> Comments { get; set; }
        public virtual ICollection<User> Following { get; set; }
        public virtual ICollection<User> Followers { get; set; }
        public virtual ICollection<Post> Liked { get; set; }
    }
}
