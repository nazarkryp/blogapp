using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;

using BlogApp.Api.Managers;
using BlogApp.Services.Services;

using Microsoft.Owin.Security;
using Microsoft.Owin.Security.Cookies;
using Microsoft.Owin.Security.OAuth;

namespace BlogApp.Api.Providers
{
    public class DefaultOAuthProvider : OAuthAuthorizationServerProvider
    {
        private readonly string clientId;

        public DefaultOAuthProvider(string clientId)
        {
            this.clientId = clientId;
        }

        public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {
            try
            {
                var service = UnityConfig.Resolve<IUsersService>();
                var userManager = new UserManager(service);

                var user = await userManager.GetUserAsync(context.UserName, context.Password);

                var claims = new List<Claim>
                {
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                    new Claim(ClaimTypes.Name, user.Username)
                };

                var oAuthIdentity = new ClaimsIdentity(claims, OAuthDefaults.AuthenticationType);
                var cookiesIdentity = new ClaimsIdentity(CookieAuthenticationDefaults.AuthenticationType);

                var properties = CreateProperties(user.Username);
                var ticket = new AuthenticationTicket(oAuthIdentity, properties);

                context.Validated(ticket);
                context.Request.Context.Authentication.SignIn(cookiesIdentity);
            }
            catch (Exception e)
            {
                context.SetError("invalid_grant", e.Message);
            }
        }

        public override Task TokenEndpoint(OAuthTokenEndpointContext context)
        {
            foreach (var property in context.Properties.Dictionary)
            {
                context.AdditionalResponseParameters.Add(property.Key, property.Value);
            }

            return Task.FromResult<object>(null);
        }

        public override Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
            if (context.ClientId == null)
            {
                context.Validated();
            }

            return Task.FromResult<object>(null);
        }

        public override Task ValidateClientRedirectUri(OAuthValidateClientRedirectUriContext context)
        {
            if (context.ClientId == clientId)
            {
                var expectedRootUri = new Uri(context.Request.Uri, "/");

                if (expectedRootUri.AbsoluteUri == context.RedirectUri)
                {
                    context.Validated();
                }
            }

            return Task.FromResult<object>(null);
        }

        public static AuthenticationProperties CreateProperties(string userName)
        {
            IDictionary<string, string> data = new Dictionary<string, string>
            {
                { "userName", userName }
            };

            return new AuthenticationProperties(data);
        }
    }
}