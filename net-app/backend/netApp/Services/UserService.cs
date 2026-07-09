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

    public async Task<IEnumerable<UserResponseDto>> GetAllUsersAsync()
    {
        return await _context.Users
            .Select(u => new UserResponseDto
            {
                Id = u.Id,
                Name = u.Name,
                DateOfBirth = u.DateOfBirth,
                Age = u.Age  // Using the computed property
            })
            .ToListAsync();
    }

    public async Task<UserResponseDto?> GetUserByIdAsync(int id)
    {
        var user = await _context.Users.FindAsync(id);
        if (user == null) return null;
        
        return new UserResponseDto
        {
            Id = user.Id,
            Name = user.Name,
            DateOfBirth = user.DateOfBirth,
            Age = user.Age
        };
    }

    public async Task<User> CreateUserAsync(UserCreateDto userDto)
    {
        var newUser = new User
        {
            Name = userDto.Name,
            DateOfBirth = userDto.DateOfBirth
        };

        await _context.Users.AddAsync(newUser);
        await _context.SaveChangesAsync();

        return newUser;
    }

    // Changed: Update with DateOfBirth
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

        if (userDto.DateOfBirth.HasValue)
        {
            existingUser.DateOfBirth = userDto.DateOfBirth.Value;
        }

        await _context.SaveChangesAsync();
        return existingUser;
    }

    // Delete method remains the same
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