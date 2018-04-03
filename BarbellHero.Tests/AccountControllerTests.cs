using System;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using BarbellHero.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.TestHost;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using Xunit;

namespace BarbellHero.Tests
{
  public class AccountControllerTests
  {
    private readonly TestServer server;
    private readonly HttpClient client;

    public AccountControllerTests() {
      var projectDirectory = Path.GetFullPath(@"..\..\..\..\BarbellHero");
      server = new TestServer(new WebHostBuilder()
        .UseEnvironment("Development")
        .UseContentRoot(projectDirectory)
        .UseConfiguration(new ConfigurationBuilder()
          .SetBasePath(projectDirectory)
          .AddJsonFile("appsettings.json")
          .Build()
        ).UseStartup<Startup>());
      client = server.CreateClient();
    }

    [Fact]
    public async Task Test1()
    {
      var requestData = new RegisterBindingModel
      {
        FirstName = "example",
        LastName = "user",
        Email = "user@example.com",
        Password = "Password%0"
      };
      var json = JsonConvert.SerializeObject(requestData);
      var content = new StringContent(json, Encoding.UTF8, "application/json");
      var result = await client.PostAsync("/api/Account/Register", content);
      Assert.Equal(HttpStatusCode.OK, result.StatusCode);
    }
  }
}
