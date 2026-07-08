using Microsoft.AspNetCore.Mvc;
using netApp.Models;
using netApp.DTOs;

namespace netApp.Controllers;

[ApiController]
[Route("api")] 
public class UserController : ControllerBase
{
    // lista simulada, remover depois de conectar no banco    
    private static List<User> _users = new List<User>
    {
        new User { Id = 1, Name = "João Silva", Age = 28},
        new User { Id = 2, Name = "Maria Santos", Age = 34},
        new User { Id = 3, Name = "Pedro Oliveira", Age = 25},
        new User { Id = 4, Name = "Ana Costa", Age = 31},
        new User { Id = 5, Name = "Lucas Pereira", Age = 29}
    };
    private static int _nextId = 6;

    // GET all: api/users
    [HttpGet("users")]  
    public IActionResult GetUsers()
    {
        return Ok(_users);
    }

    // GET one: api/users/{id}
    [HttpGet("users/{id}")]  
    public IActionResult GetUserById(int id)
    {
        var user = _users.FirstOrDefault(u => u.Id == id);
        if (user == null)
        {
            return NotFound(new { message = $"User with ID {id} not found" });
        }
        return Ok(user);
    }

    // POST: api/users
    [HttpPost("users")]  
    public IActionResult CreateUser([FromBody] UserCreateDto userDto)
    {
        var newUser = new User
        {
            Id = _nextId++,
            Name = userDto.Name,
            Age = userDto.Age
        };

        _users.Add(newUser);

        return CreatedAtAction(
            nameof(GetUserById), 
            new { id = newUser.Id }, 
            newUser
        );
    }

    // PUT: api/users/{id}
    [HttpPut("users/{id}")]  
    public IActionResult UpdateUser(int id, [FromBody] UserUpdateDto userDto)
    {
        var existingUser = _users.FirstOrDefault(u => u.Id == id);
        if (existingUser == null)
        {
            return NotFound(new { message = $"User with ID {id} not found" });
        }

        existingUser.Name = userDto.Name;
        existingUser.Age = userDto.Age;

        return NoContent();
    }

    // DELETE: api/users/{id}
    [HttpDelete("users/{id}")]
    public IActionResult DeleteUser(int id)
    {
        var user = _users.FirstOrDefault(u => u.Id == id);
        if (user == null)
        {
            return NotFound(new { message = $"User with ID {id} not found" });
        }

        _users.Remove(user);

        // Cascade delete: 
        var userTransactions = TransactionController.GetTransactionsByUserStatic(id);
        foreach (var transaction in userTransactions.ToList())
        {
            TransactionController.DeleteTransactionStatic(transaction.Id);
        }

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

    public static User? GetUserByIdStatic(int id)
    {
        return _users.FirstOrDefault(u => u.Id == id);
    }

    public static List<User> GetAllUsersStatic()
    {
        return _users.ToList();
    }
}