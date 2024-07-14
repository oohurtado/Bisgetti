using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Server.Source.Models.Entities;
using System;
using System.Reflection.Emit;

namespace Server.Source.Data
{
    public class DatabaseContext : IdentityDbContext<UserEntity>
    {
        public virtual DbSet<AddressEntity> Addresses { get; set; }
        public virtual DbSet<MenuEntity> Menus { get; set; }
        public virtual DbSet<CategoryEntity> Categories { get; set; }
        public virtual DbSet<ProductEntity> Products { get; set; }
        public virtual DbSet<MenuStuffEntity> MenuStuff { get; set; }

        public DatabaseContext(DbContextOptions<DatabaseContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<AddressEntity>().ToTable("Addresses");
            builder.Entity<MenuEntity>().ToTable("Menus");
            builder.Entity<CategoryEntity>().ToTable("Categories");
            builder.Entity<ProductEntity>().ToTable("Products");
            builder.Entity<MenuStuffEntity>().ToTable("MenuStuff");

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
                e.Property(p => p.City).IsRequired(required: true).HasMaxLength(50);
                e.Property(p => p.Suburb).IsRequired(required: true).HasMaxLength(50);
                e.Property(p => p.Street).IsRequired(required: true).HasMaxLength(50);
                e.Property(p => p.ExteriorNumber).IsRequired(required: true).HasMaxLength(10);
                e.Property(p => p.InteriorNumber).IsRequired(required: false).HasMaxLength(10);
                e.Property(p => p.PostalCode).IsRequired(required: true).HasMaxLength(10);
                e.Property(p => p.PhoneNumber).IsRequired(required: true).HasMaxLength(10);
                e.Property(p => p.MoreInstructions).IsRequired(required: false).HasMaxLength(250);
                e.Property(p => p.IsDefault).IsRequired(required: true);

                e.HasOne(p => p.User).WithMany(p => p.Addresses).HasForeignKey(p => p.UserId);

                e.HasIndex(p => new { p.UserId, p.Name }).IsUnique();
            });

            builder.Entity<MenuEntity>(e =>
            {
                e.Property(p => p.Id).HasColumnName("MenuId");

                e.Property(p => p.Name).IsRequired(required: true).HasMaxLength(50);
                e.Property(p => p.Description).IsRequired(required: false).HasMaxLength(100);

                e.HasIndex(p => new { p.Name }).IsUnique();

                e.HasMany(p => p.MenuStuff).WithOne(p => p.Menu).OnDelete(DeleteBehavior.Cascade);
            });

            builder.Entity<CategoryEntity>(e =>
            {
                e.Property(p => p.Id).HasColumnName("CategoryId");

                e.Property(p => p.Name).IsRequired(required: true).HasMaxLength(50);
                e.Property(p => p.Description).IsRequired(required: false).HasMaxLength(100);

                e.HasIndex(p => new { p.Name }).IsUnique();

                e.HasMany(p => p.MenuStuff).WithOne(p => p.Category).OnDelete(DeleteBehavior.Cascade);
            });

            builder.Entity<ProductEntity>(e =>
            {
                e.Property(p => p.Id).HasColumnName("ProductId");

                e.Property(p => p.Name).IsRequired(required: true).HasMaxLength(50);
                e.Property(p => p.Description).IsRequired(required: false).HasMaxLength(100);
                e.Property(p => p.Ingredients).IsRequired(required: false).HasMaxLength(100);
                e.Property(e => e.Price).HasColumnType("decimal(15,2)");

                e.HasIndex(p => new { p.Name }).IsUnique();

                e.HasMany(p => p.MenuStuff).WithOne(p => p.Product).OnDelete(DeleteBehavior.Cascade);
            });

            builder.Entity<MenuStuffEntity>(e =>
            {
                e.Property(p => p.Id).HasColumnName("MenuCategoryProductId");

                e.Property(p => p.ImagePath).IsRequired(required: false).HasMaxLength(250);
                e.Property(p => p.Position).IsRequired(required: false);
                e.Property(p => p.IsVisible).IsRequired(required: true);
                e.Property(p => p.IsAvailable).IsRequired(required: true);
                e.Property(p => p.IsSoldOut).IsRequired(required: true);
                e.Property(p => p.MenuId).IsRequired(required: true);
                e.Property(p => p.CategoryId).IsRequired(required: false);
                e.Property(p => p.ProductId).IsRequired(required: false);
            });
        }
    }
}
