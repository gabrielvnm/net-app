using Microsoft.AspNetCore.Mvc;
using netApp.Models;
using netApp.DTOs;
using netApp.Services;

namespace netApp.Controllers;

[ApiController]
[Route("api")] 
public class UserController : ControllerBase
{
    private readonly IUserService _userService;
    private readonly ITransactionService _transactionService;

    public UserController(IUserService userService, ITransactionService transactionService)
    {
        _userService = userService;
        _transactionService = transactionService;
    }

    // GET all: api/users
    [HttpGet("users")]  
    public async Task<IActionResult> GetUsers()
    {
        var users = await _userService.GetAllUsersAsync();
        return Ok(users);
    }

    // GET one: api/users/{id}
    [HttpGet("users/{id}")]  
    public async Task<IActionResult> GetUserById(int id)
    {
        var user = await _userService.GetUserByIdAsync(id);
        if (user == null)
        {
            return NotFound(new { message = $"User with ID {id} not found" });
        }
        return Ok(user);
    }

    // POST: api/users
    [HttpPost("users")]  
    public async Task<IActionResult> CreateUser([FromBody] UserCreateDto userDto)
    {
        var newUser = await _userService.CreateUserAsync(userDto);
        return CreatedAtAction(
            nameof(GetUserById), 
            new { id = newUser.Id }, 
            newUser
        );
    }

    // PATCH: api/users/{id}
    [HttpPatch("users/{id}")]  
    public async Task<IActionResult> UpdateUser(int id, [FromBody] UserUpdateDto userDto)
    {
        var updatedUser = await _userService.UpdateUserAsync(id, userDto);
        if (updatedUser == null)
        {
            return NotFound(new { message = $"User with ID {id} not found" });
        }

        return NoContent();
    }

    // DELETE: api/users/{id}
    [HttpDelete("users/{id}")]
    public async Task<IActionResult> DeleteUser(int id)
    {
        var userExists = await _userService.UserExistsAsync(id);
        if (!userExists)
        {
            return NotFound(new { message = $"User with ID {id} not found" });
        }

        await _userService.DeleteUserAsync(id);

        // Cascade delete:
        await _transactionService.DeleteTransactionsByUserAsync(id);

        return NoContent();
    }

    // GET: api/
    [HttpGet]  
    public IActionResult Get()
    {
        return Ok(new { 
            message = "API is working!",
            timestamp = DateTime.UtcNow,
        });
    }
}