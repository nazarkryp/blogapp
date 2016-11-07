using System.Web.Http;

using Microsoft.Owin;
using Microsoft.Owin.Cors;
using Owin;

[assembly: OwinStartup(typeof(BlogApp.Api.Startup))]

namespace BlogApp.Api
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            var config = new HttpConfiguration();

            UnityConfig.RegisterComponents(config);
            WebApiConfig.Register(config);

            app.UseCors(CorsOptions.AllowAll);
            this.ConfigAuth(app);
            app.UseWebApi(config);
        }
    }
}
