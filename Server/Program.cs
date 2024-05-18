

using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using Server.Source.Data;
using Server.Source.Exceptions;
using Server.Source.Logic;
using Server.Source.Logic.User;
using Server.Source.Models.DTOs;
using Server.Source.Models.Entities;
using Server.Source.Utilities;
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

            // repositories
            builder.Services.AddScoped<IAspNetRepository, AspNetRepository>();

            // logic
            builder.Services.AddScoped<SeedLogic>();
            builder.Services.AddScoped<UserAccessLogic>();
            builder.Services.AddScoped<UserSettingsLogic>();

            // utilities
            builder.Services.AddScoped<ConfigurationUtility>();
        }

        private static void ConfigureApp(WebApplicationBuilder builder)
        {
            var app = builder.Build();
            InitSeed(app.Services);

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

            app.UseExceptionHandler(error =>
            {
                error.Run(async context =>
                {
                    context.Response.StatusCode = StatusCodes.Status500InternalServerError;
                    context.Response.ContentType = "application/json";

                    var contextFeature = context.Features.Get<IExceptionHandlerFeature>();
                    if (contextFeature != null)
                    {                        
                        var errorMessage = contextFeature.Error.Message;
                        if (contextFeature.Error is not EatSomeException)              
                        {
                            errorMessage = "Error interno del servidor. Vuelva a intentarlo más tarde.";
                        }
                        
                        await context.Response.WriteAsync(JsonConvert.SerializeObject(new Response() { Success = false, ErrorMessage = errorMessage } ));
                    }
                });
            });

            app.Run();
        }

        private static void InitSeed(IServiceProvider services)
        {
            using var scope = services.CreateScope();
            var init = scope.ServiceProvider.GetService<SeedLogic>();
            init?.InitAsync().Wait();
        }
    }
}
