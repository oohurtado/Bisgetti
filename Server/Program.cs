

using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Server.Source.Data;
using Server.Source.Models.Entities;
using System.Text;

namespace Server
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            ConfigureServices(builder);
            ConfigureApp(builder);
        }

        private static void ConfigureServices(WebApplicationBuilder builder)
        {
            // Add services to the container.

            builder.Services
                .AddControllers()
                .AddNewtonsoftJson(options =>
                {
                    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
                });

            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.Services.AddCors();

            builder.Services
                .AddIdentity<UserEntity, IdentityRole>(p =>
                {
                    p.User.RequireUniqueEmail = true;
                    p.Password.RequireDigit = false;
                    p.Password.RequiredUniqueChars = 0;
                    p.Password.RequireLowercase = false;
                    p.Password.RequireNonAlphanumeric = false;
                    p.Password.RequireUppercase = false;
                    p.Password.RequiredLength = 3;
                })
                .AddEntityFrameworkStores<DatabaseContext>()
                .AddDefaultTokenProviders();

            string? connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
            builder.Services.AddDbContext<DatabaseContext>(p =>
            {
                //p.UseSqlServer(connectionString);
                p.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString));                
            });

            _ = builder.Services
                .AddAuthentication(options =>
                {
                    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                })
                .AddJwtBearer(options =>
                {                   
                    options.IncludeErrorDetails = true;
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = false,
                        ValidateAudience = false,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JWT:Key"]!)),
                        ClockSkew = TimeSpan.Zero,
                    };
                });

            builder.Services.AddSignalR(p => p.EnableDetailedErrors = true);
        }

        private static void ConfigureApp(WebApplicationBuilder builder)
        {
            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseAuthentication();
            app.UseAuthorization();            

            app.UseCors(builder => builder
                .AllowAnyMethod()
                .AllowAnyHeader()
                .SetIsOriginAllowed(origin => true) // allow any origin
                .WithOrigins("*")
                );

            app.MapControllers();

            app.Run();
        }

    }
}
