using System;
using System.Threading.Tasks;
using System.Web.Http;

using BlogApp.Api.Managers;
using BlogApp.Api.Models;
using BlogApp.Services.Services;

namespace BlogApp.Api.Controllers
{
    [RoutePrefix("api/account")]
    public class AccountController : ApiController
    {
        private readonly UserManager userManager;

        public AccountController(IUsersService service)
        {
            this.userManager = new UserManager(service);
        }

        [Route("create")]
        [HttpPost]
        public async Task<IHttpActionResult> RegisterAsync(RegistrationViewModel user)
        {
            try
            {
                await this.userManager.CreateUserAsync(user.Username, user.Password);

                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
