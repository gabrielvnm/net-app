using Microsoft.AspNetCore.Mvc;
using netApp.Models;
using netApp.DTOs;
using netApp.Services;

namespace netApp.Controllers;

[ApiController]
[Route("api/transactions")]
public class TransactionController : ControllerBase
{
    private readonly ITransactionService _transactionService;
    private readonly IUserService _userService;

    public TransactionController(ITransactionService transactionService, IUserService userService)
    {
        _transactionService = transactionService;
        _userService = userService;
    }

    // GET: api/transactions
    [HttpGet]
    public async Task<IActionResult> GetAllTransactions([FromQuery] int? userId, [FromQuery] TransactionType? type)
    {
        var transactions = await _transactionService.GetAllTransactionsAsync(userId, type);
        
        var result = new List<TransactionResponseDto>();
        foreach (var t in transactions)
        {
            var user = await _userService.GetUserByIdAsync(t.UserId);
            result.Add(new TransactionResponseDto
            {
                Id = t.Id,
                Description = t.Description,
                Value = t.Value,
                Type = t.Type,
                UserId = t.UserId,
                UserName = user?.Name ?? "Unknown User"
            });
        }

        return Ok(result);
    }

    // GET: api/transactions/{id}
    [HttpGet("{id}")]
    public async Task<IActionResult> GetTransactionById(int id)
    {
        var transaction = await _transactionService.GetTransactionByIdAsync(id);
        if (transaction == null)
        {
            return NotFound(new { message = $"Transaction with ID {id} not found" });
        }

        var user = await _userService.GetUserByIdAsync(transaction.UserId);
        var result = new TransactionResponseDto
        {
            Id = transaction.Id,
            Description = transaction.Description,
            Value = transaction.Value,
            Type = transaction.Type,
            UserId = transaction.UserId,
            UserName = user?.Name ?? "Unknown User"
        };

        return Ok(result);
    }

    // POST: api/transactions
    [HttpPost]
    public async Task<IActionResult> CreateTransaction([FromBody] TransactionCreateDto transactionDto)
    {
        try
        {
            var userExists = await _userService.UserExistsAsync(transactionDto.UserId);
            if (!userExists)
            {
                return BadRequest(new { message = $"User with ID {transactionDto.UserId} not found" });
            }

            var newTransaction = await _transactionService.CreateTransactionAsync(transactionDto);

            var user = await _userService.GetUserByIdAsync(newTransaction.UserId);
            var result = new TransactionResponseDto
            {
                Id = newTransaction.Id,
                Description = newTransaction.Description,
                Value = newTransaction.Value,
                Type = newTransaction.Type,
                UserId = newTransaction.UserId,
                UserName = user?.Name ?? "Unknown User"
            };

            return CreatedAtAction(
                nameof(GetTransactionById), 
                new { id = newTransaction.Id }, 
                result
            );
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { error = ex.Message });
        }
        catch (Exception)
        {
            return StatusCode(500, new { error = "An unexpected error occurred" });
        }
    }
}