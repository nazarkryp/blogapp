using System;

namespace BlogApp.ViewModels
{
    public class CommentViewModel
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public DateTime Date { get; set; }
        public UserViewModel From { get; set; }
    }
}
