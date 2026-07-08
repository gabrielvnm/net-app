using Microsoft.AspNetCore.Mvc;
using netApp.Models;
using netApp.DTOs;

namespace netApp.Controllers;

[ApiController]
[Route("api/transactions")]
public class TransactionController : ControllerBase
{
    private static List<Transaction> _transactions = new List<Transaction>();
    private static int _nextTransactionId = 1;

    // GET all: api/transactions - 
    [HttpGet]
    public IActionResult GetAllTransactions()
    {
        var result = _transactions.Select(t => new TransactionResponseDto
        {
            Id = t.Id,
            Description = t.Description,
            Value = t.Value,
            Type = t.Type,
            UserId = t.UserId,
            UserName = GetUserName(t.UserId)
        });

        return Ok(result);
    }

    // GET one: api/transactions/{id}
    [HttpGet("{id}")]
    public IActionResult GetTransactionById(int id)
    {
        var transaction = _transactions.FirstOrDefault(t => t.Id == id);
        if (transaction == null)
        {
            return NotFound(new { message = $"Transaction with ID {id} not found" });
        }

        var result = new TransactionResponseDto
        {
            Id = transaction.Id,
            Description = transaction.Description,
            Value = transaction.Value,
            Type = transaction.Type,
            UserId = transaction.UserId,
            UserName = GetUserName(transaction.UserId)
        };

        return Ok(result);
    }

    // POST: api/transactions
    [HttpPost]
    public IActionResult CreateTransaction([FromBody] TransactionCreateDto transactionDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        if (!transactionDto.Type.HasValue || !Enum.IsDefined(typeof(TransactionType), transactionDto.Type.Value))
        {
            return BadRequest(new { 
                type = new[] { "Invalid transaction type. Must be 'Receita' or 'Despesa'" } 
            });
        }

        var userExists = UserController.GetUserByIdStatic(transactionDto.UserId);
        if (userExists == null)
        {
            return BadRequest(new { message = $"User with ID {transactionDto.UserId} not found" });
        }

        var newTransaction = new Transaction
        {
            Id = _nextTransactionId++,
            Description = transactionDto.Description,
            Value = transactionDto.Value,
            Type = transactionDto.Type.Value,
            UserId = transactionDto.UserId
        };

        _transactions.Add(newTransaction);

        var result = new TransactionResponseDto
        {
            Id = newTransaction.Id,
            Description = newTransaction.Description,
            Value = newTransaction.Value,
            Type = newTransaction.Type,
            UserId = newTransaction.UserId,
            UserName = GetUserName(newTransaction.UserId)
        };

        return CreatedAtAction(
            nameof(GetTransactionById), 
            new { id = newTransaction.Id }, 
            result
        );
    }

    // Helper 
    private string GetUserName(int userId)
    {
        var user = UserController.GetUserByIdStatic(userId);
        return user?.Name ?? "Unknown User";
    }

    // cascade delete
    public static void DeleteTransactionStatic(int transactionId)
    {
        var transaction = _transactions.FirstOrDefault(t => t.Id == transactionId);
        if (transaction != null)
        {
            _transactions.Remove(transaction);
        }
    }

    public static List<Transaction> GetTransactionsByUserStatic(int userId)
    {
        return _transactions.Where(t => t.UserId == userId).ToList();
    }
}