

using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using Server.Source.Data;
using Server.Source.Data.Interfaces;
using Server.Source.Exceptions;
using Server.Source.Logic;
using Server.Source.Models.DTOs;
using Server.Source.Utilities;
using System.Diagnostics;
using System;
using System.Text;
using Server.Source.Models.DTOs.User.Address;
using Server.Source.Services.Interfaces;
using Server.Source.Services;
using Server.Source.Models.Entities;

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

            builder.Services.AddCors(o => o.AddPolicy(name: "OriginAngular", policy =>
            {
                policy
                .WithOrigins("http://localhost:4200")
                .AllowAnyMethod()
                .AllowAnyHeader();
            }));

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
            builder.Services.AddScoped<IAddressRepository, AddressRepository>();
            builder.Services.AddScoped<IBusinessRepository, BusinessRepository>();

            // logic
            builder.Services.AddScoped<SeedLogic>();
            builder.Services.AddScoped<UserLogicAccess>();
            builder.Services.AddScoped<UserLogicAddress>();
            builder.Services.AddScoped<UserLogicAdministration>();
            builder.Services.AddScoped<UserLogicCommon>();
            builder.Services.AddScoped<BusinessLogicMenu>();
            builder.Services.AddScoped<BusinessLogicCatalog>();
            builder.Services.AddScoped<BusinessLogicProduct>();

            // utilities
            builder.Services.AddScoped<ConfigurationUtility>();

            // services
            builder.Services.AddScoped<INotificationService, EmailNotificationService>();

            builder.Services.AddAutoMapper(p =>
            {
                p.CreateMap<AddressEntity, AddressResponse>();
                p.CreateMap<CreateOrUpdateAddressRequest, AddressEntity>();
            }, typeof(Program));
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

            app.UseCors("OriginAngular");

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseAuthentication();
            app.UseAuthorization();            

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
                        var errorMessage = "Error interno del servidor. Vuelva a intentarlo más tarde.";

                        if (contextFeature.Error is EatSomeInternalErrorException)              
                        {
                            context.Response.StatusCode = StatusCodes.Status500InternalServerError;
                            errorMessage = contextFeature.Error.Message;
                        }
                        else if (contextFeature.Error is EatSomeNotFoundErrorException)
                        {
                            context.Response.StatusCode = StatusCodes.Status404NotFound;
                            errorMessage = contextFeature.Error.Message;
                        }

                        await context.Response.WriteAsync(JsonConvert.SerializeObject(errorMessage));
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
