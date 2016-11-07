using System;
using System.Collections.Generic;

namespace BlogApp.Entities
{
    public class Post : IKeyed<int>
    {
        public Post()
        {
            this.Comments = new List<Comment>();
            this.Likes = new List<User>();
        }

        public int Id { get; set; }
        public string ImageUri { get; set; }
        public string Caption { get; set; }
        public int OwnerId { get; set; }
        public DateTime Created { get; set; }
        public virtual User Owner { get; set; }
        public virtual ICollection<Comment> Comments { get; set; }
        public virtual ICollection<User> Likes { get; set; }
    }
}
