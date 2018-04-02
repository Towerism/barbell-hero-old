using BarbellHero.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace BarbellHero.DataAccess {
  public class BarbellHeroDbContext : IdentityDbContext
  {
    public BarbellHeroDbContext(DbContextOptions options) : base(options) { }

    public DbSet<ApplicationUser> ApplicationUsers { get; set; }
  }
}
