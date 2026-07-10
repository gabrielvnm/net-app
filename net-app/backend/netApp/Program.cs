using Microsoft.EntityFrameworkCore;
using netApp.Data;
using netApp.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<ITransactionService, TransactionService>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowLocal",
        policy =>
        {
            policy.WithOrigins("http://localhost:5173", "http://localhost:4173", "http://localhost:5092")
                  .AllowAnyMethod()
                  .AllowAnyHeader()
                  .AllowCredentials();
        });
});

var app = builder.Build();

app.UseCors("AllowLocal");

app.UseDefaultFiles();
app.UseStaticFiles(); 

app.MapControllers();

app.MapFallbackToFile("index.html");

app.Run();