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
        public virtual DbSet<PersonEntity> People { get; set; }
        public virtual DbSet<CartElementEntity> CartElements { get; set; }
        public virtual DbSet<OrderEntity> Orders { get; set; }
        public virtual DbSet<OrderElementEntity> OrderElements { get; set; }
        public virtual DbSet<OrderStatusEntity> OrderStatuses { get; set; }

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
            builder.Entity<PersonEntity>().ToTable("People");
            builder.Entity<CartElementEntity>().ToTable("CartElements");
            builder.Entity<OrderEntity>().ToTable("Orders");
            builder.Entity<OrderElementEntity>().ToTable("OrderElements");
            builder.Entity<OrderStatusEntity>().ToTable("OrderStatuses");

            builder.Entity<UserEntity>(e =>
            {
                e.Property(p => p.FirstName).IsRequired(required: true).HasMaxLength(50);
                e.Property(p => p.LastName).IsRequired(required: true).HasMaxLength(50);

                e.HasMany(p => p.Addresses).WithOne(p => p.User).OnDelete(DeleteBehavior.Cascade);
                e.HasMany(p => p.People).WithOne(p => p.User).OnDelete(DeleteBehavior.Cascade);
                e.HasMany(p => p.CartElements).WithOne(p => p.User).OnDelete(DeleteBehavior.Cascade);
                e.HasMany(p => p.Orders).WithOne(p => p.User).OnDelete(DeleteBehavior.Cascade);
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
                e.HasMany(p => p.CartElements).WithOne(p => p.Product).OnDelete(DeleteBehavior.Cascade);                
            });

            builder.Entity<MenuStuffEntity>(e =>
            {
                e.Property(p => p.Id).HasColumnName("MenuCategoryProductId");

                e.Property(p => p.Image).IsRequired(required: false).HasMaxLength(250);
                e.Property(p => p.Position).IsRequired(required: false);
                e.Property(p => p.IsVisible).IsRequired(required: true);
                e.Property(p => p.IsAvailable).IsRequired(required: true);
                e.Property(p => p.MenuId).IsRequired(required: true);
                e.Property(p => p.CategoryId).IsRequired(required: false);
                e.Property(p => p.ProductId).IsRequired(required: false);
            });

            builder.Entity<PersonEntity>(e =>
            {
                e.Property(p => p.Id).HasColumnName("PersonId");

                e.Property(p => p.Name).IsRequired(required: true).HasMaxLength(50);

                e.HasOne(p => p.User).WithMany(p => p.People).HasForeignKey(p => p.UserId);
            });

            builder.Entity<CartElementEntity>(e =>
            {
                e.Property(p => p.Id).HasColumnName("CartElementId");

                e.Property(p => p.ProductQuantity).IsRequired(required: true);                
                e.Property(p => p.PersonName).IsRequired(required: true).HasMaxLength(50);                

                e.HasOne(p => p.Product).WithMany(p => p.CartElements).HasForeignKey(p => p.ProductId);
                e.HasOne(p => p.User).WithMany(p => p.CartElements).HasForeignKey(p => p.UserId);
            });

            builder.Entity<OrderEntity>(e =>
            {
                e.Property(p => p.Id).HasColumnName("OrderId");

                e.Property(p => p.DeliveryMethod).IsRequired(required: true).HasMaxLength(25);
                e.Property(p => p.TipPercent).IsRequired(required: true).HasColumnType("decimal(15,2)");
                e.Property(p => p.ShippingCost).IsRequired(required: true).HasColumnType("decimal(15,2)");
                e.Property(p => p.AddressName).IsRequired(required: false).HasMaxLength(50);
                e.Property(p => p.AddressJson).IsRequired(required: false);
                e.Property(p => p.PayingWith).IsRequired(required: true).HasColumnType("decimal(15,2)");
                e.Property(p => p.Comments).IsRequired(required: false).HasMaxLength(100);
                e.Property(p => p.CreatedAt).IsRequired(required: true).HasColumnType("datetime");
                e.Property(p => p.UpdatedAt).IsRequired(required: true).HasColumnType("datetime");
                e.Property(p => p.ProductCount).IsRequired(required: true);
                e.Property(p => p.ProductTotal).IsRequired(required: true);
                e.Property(p => p.Status).IsRequired(required: true);

                e.HasOne(p => p.User).WithMany(p => p.Orders).HasForeignKey(p => p.UserId);
                e.HasMany(p => p.OrderElements).WithOne(p => p.Order).OnDelete(DeleteBehavior.Cascade);
                e.HasMany(p => p.OrderStatuses).WithOne(p => p.Order).OnDelete(DeleteBehavior.Cascade);
            });

            builder.Entity<OrderElementEntity>(e =>
            {
                e.Property(p => p.Id).HasColumnName("RequestElementId");

                e.Property(p => p.ProductName).IsRequired(required: true).HasMaxLength(50);
                e.Property(p => p.ProductDescription).IsRequired(required: false).HasMaxLength(100);
                e.Property(p => p.ProductIngredients).IsRequired(required: false).HasMaxLength(100);
                e.Property(e => e.ProductPrice).HasColumnType("decimal(15,2)");
                e.Property(e => e.ProductQuantity).IsRequired(required: true);
                e.Property(p => p.PersonName).IsRequired(required: true).HasMaxLength(50);

                e.HasOne(p => p.Order).WithMany(p => p.OrderElements).HasForeignKey(p => p.OrderId);
            });

            builder.Entity<OrderStatusEntity>(e =>
            {
                e.Property(p => p.Id).HasColumnName("RequestStatusId");

                e.Property(p => p.Status).IsRequired(required: true).HasMaxLength(50);
                e.Property(p => p.EventAt).IsRequired(required: true).HasColumnType("datetime");

                e.HasOne(p => p.Order).WithMany(p => p.OrderStatuses).HasForeignKey(p => p.OrderId);
            });
        }
    }
}
