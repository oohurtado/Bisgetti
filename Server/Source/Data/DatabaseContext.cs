using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Server.Source.Models.Entities;

namespace Server.Source.Data
{
    public class DatabaseContext : IdentityDbContext<UserEntity>
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<UserEntity>(e =>
            {
                e.Property(p => p.FirstName).IsRequired(required: true).HasMaxLength(50);
                e.Property(p => p.LastName).IsRequired(required: true).HasMaxLength(50);
            });
        }
    }
}
