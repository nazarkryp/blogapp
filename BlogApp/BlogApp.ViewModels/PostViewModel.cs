using System;
using System.Collections.Generic;

namespace BlogApp.ViewModels
{
    public class PostViewModel
    {
        public int Id { get; set; }
        public string ImageUri { get; set; }
        public string Caption { get; set; }
        public bool UserHasLiked { get; set; }
        public int LikesCount { get; set; }
        public int CommentsCount { get; set; }
        public DateTime Created { get; set; }
        public UserViewModel User { get; set; }
        public IEnumerable<UserViewModel> Liked { get; set; }
        public IEnumerable<CommentViewModel> Comments { get; set; }
    }
}
