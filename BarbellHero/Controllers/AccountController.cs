using System.Threading.Tasks;
using System.Linq;
using System.Collections;
using BarbellHero.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Omu.ValueInjecter;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System;
using Microsoft.Extensions.Configuration;
using System.Text;

namespace PGCRTX.Controllers
{
  public class AccountController : Controller
  {
    private readonly UserManager<ApplicationUser> userManager;
    private readonly SignInManager<ApplicationUser> signInManager;
    private readonly ILogger<AccountController> log;
    private readonly IConfiguration config;

    public AccountController(
        UserManager<ApplicationUser> userManager,
        SignInManager<ApplicationUser> signInManager,
        RoleManager<IdentityRole> roleManager,
        ILogger<AccountController> log,
        IConfiguration config)
    {
      this.userManager = userManager;
      this.signInManager = signInManager;
      this.log = log;
      this.config = config;
    }

    [HttpPost]
    public async Task<IActionResult> Login(LoginBindingModel model)
    {
      var result = await signInManager.PasswordSignInAsync(model.Email,
          model.Password, isPersistent: false, lockoutOnFailure: false);

      if (!result.Succeeded)
      {
        ModelState.AddModelError("LoginError", "Invalid login attempt.");
        return new UnauthorizedResult();
      }

      log.LogInformation(1, "User logged in.");
      return new OkObjectResult(new
      {
        Token = BuildToken(model.Email)
      });
    }

    private string BuildToken(string userName)
    {
      var currentTime = (long)(DateTime.UtcNow - new DateTimeOffset(1970, 1, 1, 0, 0, 0, TimeSpan.Zero).ToLocalTime()).TotalSeconds;
      var expires = DateTime.UtcNow.AddMinutes(30);
      var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Jwt:SecretKey"]));
      var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
      var claims = new[]
      {
        new Claim(JwtRegisteredClaimNames.Sub, userName),
        new Claim(JwtRegisteredClaimNames.Iat, currentTime.ToString(), ClaimValueTypes.Integer64)
      };

      var token = new JwtSecurityToken(config["Jwt:Issuer"],
        config["Jwt:Audience"], claims,
        expires: expires,
        signingCredentials: creds);

      return new JwtSecurityTokenHandler().WriteToken(token);
    }

    [HttpPost]
    public async Task<IActionResult> Register(RegisterBindingModel model, string returnUrl = null)
    {
      var user = new ApplicationUser();
      user.InjectFrom(model);
      user.UserName = user.Email;

      var result = await userManager.CreateAsync(user, model.Password);
      if (!result.Succeeded)
      {
        foreach (var error in result.Errors)
        {
          ModelState.AddModelError(error.Code, error.Description);
        }
        return new BadRequestResult();
      }

      await signInManager.SignInAsync(user, isPersistent: false);
      log.LogInformation(3, "User Registered");
      return new OkResult();
    }
  }
}
