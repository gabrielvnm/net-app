using netApp.Models;
using netApp.DTOs;

namespace netApp.Services;

public interface IUserService
{
    Task<IEnumerable<UserResponseDto>> GetAllUsersAsync();
    Task<UserResponseDto?> GetUserByIdAsync(int id);
    Task<User> CreateUserAsync(UserCreateDto userDto);
    Task<User?> UpdateUserAsync(int id, UserUpdateDto userDto);
    Task<bool> DeleteUserAsync(int id);
    Task<bool> UserExistsAsync(int id);
}