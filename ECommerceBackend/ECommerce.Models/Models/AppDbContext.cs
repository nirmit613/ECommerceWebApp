using Microsoft.EntityFrameworkCore;

namespace ECommerce.Models.Models
{
    public class AppDbContext:DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
    }
}
