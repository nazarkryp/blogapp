using System;

using BlogApp.Api.Providers;

using Microsoft.Owin;
using Microsoft.Owin.Security.OAuth;
using Owin;

namespace BlogApp.Api
{
	public partial class Startup
	{
	    private void ConfigAuth(IAppBuilder app)
	    {
            app.UseOAuthBearerTokens(new OAuthAuthorizationServerOptions
            {
                TokenEndpointPath = new PathString("/authorize"),
                Provider = new DefaultOAuthProvider("publicClient"),
                AccessTokenExpireTimeSpan = TimeSpan.FromHours(5),
                AllowInsecureHttp = true
            });
        }
    }
}