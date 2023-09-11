using Microsoft.AspNetCore.Authentication.JwtBearer;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddReverseProxy()
    .LoadFromConfig(builder.Configuration.GetSection("ReverseProxy"));

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(o =>
    {
        o.Authority = builder.Configuration["IdentityServiceUrl"];
        o.RequireHttpsMetadata = false;
        o.TokenValidationParameters.ValidateIssuer = false;
        o.TokenValidationParameters.ValidateAudience = false;
        o.TokenValidationParameters.NameClaimType = "username";
    });

builder.Services.AddCors(options =>
{
    options.AddPolicy("customPolicy",
        b =>
        {
            b
                .WithOrigins(builder.Configuration["ClientApp"])
                .AllowAnyHeader()
                .AllowCredentials()
                .AllowAnyMethod();

        });
});

var app = builder.Build();

app.UseCors("customPolicy");
app.MapReverseProxy();

app.UseAuthentication();
app.UseAuthorization();

app.Run();