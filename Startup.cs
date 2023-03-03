using FaceIt2023.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;
using System.Configuration;
using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Configuration.Json;

namespace FaceIt2023
{
    public class Startup
    {
        public void Configure(IApplicationBuilder app)
        {
            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger", "My API v1");
            });

            //This can be commented out to remove
            // Run your Web API project: Start your ASP.NET Web API project and navigate to the Swagger UI URL (usually http://localhost:<port>/swagger).

            // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        }

        public void ConfigureServices(IServiceCollection services)
        {
            // Add configuration file
            IConfiguration configuration = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json")
                .Build();
            string connectionString = configuration.GetConnectionString("MyConnectionString");
            services.AddDbContext<Comp2003ZContext>(options =>
            options.UseSqlServer(connectionString));
            //services.AddDbContext<Comp2003ZContext>(options =>
            //options.UseSqlServer(Configuration.GetConnectionString("MyConnectionString")));

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "My API", Version = "v1" });
            });
        }
    }
}
