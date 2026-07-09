using Microsoft.EntityFrameworkCore;
using netApp.Data;
using netApp.Models;
using netApp.DTOs;

namespace netApp.Services;

public class UserService : IUserService
{
    private readonly AppDbContext _context;

    public UserService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<User>> GetAllUsersAsync()
    {
        return await _context.Users.ToListAsync();
    }

    public async Task<User?> GetUserByIdAsync(int id)
    {
        return await _context.Users.FindAsync(id);
    }

    public async Task<User> CreateUserAsync(UserCreateDto userDto)
    {
        var newUser = new User
        {
            Name = userDto.Name,
            Age = userDto.Age
        };

        await _context.Users.AddAsync(newUser);
        await _context.SaveChangesAsync();

        return newUser;
    }

    public async Task<User?> UpdateUserAsync(int id, UserUpdateDto userDto)
    {
        var existingUser = await _context.Users.FindAsync(id);
        if (existingUser == null)
        {
            return null;
        }

        if (!string.IsNullOrWhiteSpace(userDto.Name))
        {
            existingUser.Name = userDto.Name;
        }

        if (userDto.Age.HasValue)
        {
            existingUser.Age = userDto.Age.Value;
        }

        await _context.SaveChangesAsync();
        return existingUser;
    }

    public async Task<bool> DeleteUserAsync(int id)
    {
        var user = await _context.Users.FindAsync(id);
        if (user == null)
        {
            return false;
        }

        _context.Users.Remove(user);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> UserExistsAsync(int id)
    {
        return await _context.Users.AnyAsync(u => u.Id == id);
    }
}