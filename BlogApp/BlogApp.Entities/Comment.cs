using System;

namespace BlogApp.Entities
{
    public class Comment : IKeyed<int>
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public DateTime Date { get; set; }
        public int OwnerId { get; set; }
        public virtual User Owner { get; set; }
        public int PostId { get; set; }
        public virtual Post Post { get; set; }
    }
}
