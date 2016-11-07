using System;
using System.Threading.Tasks;
using System.Web.Http;

using BlogApp.Services.Services;
using BlogApp.ViewModels;
using Microsoft.AspNet.Identity;
using System.Data.Entity.Core;

namespace BlogApp.Api.Controllers
{
    [Authorize]
    [RoutePrefix("api/posts")]
    public class PostsController : ApiController
    {
        private readonly IPostsService service;

        public PostsController(IPostsService service)
        {
            this.service = service;
        }

        [HttpGet]
        public async Task<IHttpActionResult> GetPostsAsync()
        {
            try
            {
                var userId = this.User.Identity.GetUserId<int>();

                var post = await this.service.GetPostsAsync(userId);

                return Ok(post);
            }
            catch (ObjectNotFoundException)
            {
                return NotFound();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<IHttpActionResult> GetUserPostsAsync([FromUri]int userId)
        {
            try
            {
                var currentUserId = this.User.Identity.GetUserId<int>();
                var post = await this.service.GetUserPostsAsync(currentUserId, userId);

                return Ok(post);
            }
            catch (ObjectNotFoundException)
            {
                return NotFound();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost]
        public async Task<IHttpActionResult> CreatePostAsync(PostViewModel post)
        {
            try
            {
                var userId = this.User.Identity.GetUserId<int>();
                var result = await this.service.CreatePost(post, userId);

                return Ok(result);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("like")]
        [HttpPost]
        public async Task<IHttpActionResult> LikeAsync([FromUri]int postId)
        {
            try
            {
                var userId = this.User.Identity.GetUserId<int>();
                var post = await this.service.LikeAsync(postId, userId);

                return Ok(post);
            }
            catch (ObjectNotFoundException)
            {
                return NotFound();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
