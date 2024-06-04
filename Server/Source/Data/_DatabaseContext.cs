using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Server.Source.Models.Entities;
using System;

namespace Server.Source.Data
{
    public class DatabaseContext : IdentityDbContext<UserEntity>
    {
        public virtual DbSet<AddressEntity> Addresses { get; set; }

        public DatabaseContext(DbContextOptions<DatabaseContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<UserEntity>(e =>
            {
                e.HasMany(p => p.Addresses).WithOne(p => p.User).OnDelete(DeleteBehavior.Cascade);
            });

            builder.Entity<AddressEntity>(e =>
            {
                e.Property(p => p.Id).HasColumnName("AddressId");

                e.Property(p => p.Name).IsRequired(required: true).HasMaxLength(50);
                e.Property(p => p.Country).IsRequired(required: true).HasMaxLength(50);
                e.Property(p => p.State).IsRequired(required: true).HasMaxLength(50);
                e.Property(p => p.Suburb).IsRequired(required: true).HasMaxLength(50);
                e.Property(p => p.Street).IsRequired(required: true).HasMaxLength(50);
                e.Property(p => p.InteriorNumber).IsRequired(required: true).HasMaxLength(10);
                e.Property(p => p.ExteriorNumber).IsRequired(required: false).HasMaxLength(10);
                e.Property(p => p.PostalCode).IsRequired(required: true).HasMaxLength(10);
                e.Property(p => p.PhoneNumber).IsRequired(required: true).HasMaxLength(10);
                e.Property(p => p.MoreInstructions).IsRequired(required: false).HasMaxLength(250);
                e.Property(p => p.IsDefault).IsRequired(required: true);

                e.HasOne(p => p.User).WithMany(p => p.Addresses).HasForeignKey(p => p.UserId);

                e.HasIndex(p => new { p.UserId, p.Name }).IsUnique();
            });
        }
    }
}
