using System.Linq;

using BlogApp.Entities;
using BlogApp.ViewModels;

namespace BlogApp.Services.Mappers
{
    public class PostMapper : IPostMapper
    {
        private readonly IUserMapper userMapper;
        private readonly ICommentMapper commentMapper;

        public PostMapper(IUserMapper mapper, ICommentMapper commentMapper)
        {
            this.userMapper = mapper;
            this.commentMapper = commentMapper;
        }

        public Post Map(PostViewModel post)
        {
            return new Post
            {
                Id = post.Id,
                ImageUri = post.ImageUri,
                Caption = post.Caption
            };
        }

        public PostViewModel Map(Post post, int userId)
        {
            var postViewModel = new PostViewModel
            {
                Id = post.Id,
                ImageUri = post.ImageUri,
                Caption = post.Caption,
                Created = post.Created
            };

            postViewModel.User = this.userMapper.Map(post.Owner);

            if (post.Likes != null && post.Likes.Count > 0)
            {
                postViewModel.LikesCount = post.Likes.Count;

                if (userId > 0)
                {
                    postViewModel.UserHasLiked = post.Likes.Any(l => l.Id == userId);
                }

                if (post.Likes.Count > 3)
                {
                    postViewModel.Liked = post.Likes
                        .Skip(post.Likes.Count - 3)
                        .Take(3)
                        .Select(u => this.userMapper.Map(u));
                }
                else
                {
                    postViewModel.Liked = post.Likes
                        .Select(u => this.userMapper.Map(u));
                }
            }

            if (post.Comments != null && post.Comments.Count > 0)
            {
                postViewModel.CommentsCount = post.Comments.Count;

                if (post.Comments.Count > 3)
                {
                    postViewModel.Comments =
                        post.Comments
                            .Skip(post.Comments.Count - 3)
                            .Take(3)
                            .Select(c => this.commentMapper.Map(c));
                }
                else
                {
                    postViewModel.Comments =
                        post.Comments.Select(c => this.commentMapper.Map(c));
                }
            }

            return postViewModel;
        }
    }
}
