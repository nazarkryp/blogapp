using System;
using System.Threading.Tasks;
using System.Web.Http;

using BlogApp.Services.Services;
using BlogApp.ViewModels;

using Microsoft.AspNet.Identity;

namespace BlogApp.Api.Controllers
{
    [Authorize]
    [RoutePrefix("api/comments")]
    public class CommentsController : ApiController
    {
        private readonly ICommentsService service;

        public CommentsController(ICommentsService service)
        {
            this.service = service;
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<IHttpActionResult> GetCommentsAsync([FromUri] int postId)
        {
            try
            {
                var comments = await this.service.GetCommentsAsync(postId);

                return Ok(comments);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost]
        public async Task<IHttpActionResult> PostCommentAsync(CommentViewModel comment, [FromUri]int postId)
        {
            try
            {
                var userId = this.User.Identity.GetUserId<int>();

                var commentViewModel = await this.service.AddCommentAsync(comment, postId, userId);

                return Ok(commentViewModel);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
