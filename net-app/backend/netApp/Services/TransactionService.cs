using Microsoft.EntityFrameworkCore;
using netApp.Data;
using netApp.Models;
using netApp.DTOs;
using netApp.Helpers;

namespace netApp.Services;

public class TransactionService : ITransactionService
{
    private readonly AppDbContext _context;

    public TransactionService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Transaction>> GetAllTransactionsAsync(int? userId = null, TransactionType? type = null)
    {
        var query = _context.Transactions.AsQueryable();

        if (userId.HasValue)
        {
            query = query.Where(t => t.UserId == userId.Value);
        }

        if (type.HasValue)
        {
            query = query.Where(t => t.Type == type.Value);
        }

        return await query.ToListAsync();
    }

    public async Task<Transaction?> GetTransactionByIdAsync(int id)
    {
        return await _context.Transactions.FindAsync(id);
    }

    public async Task<Transaction> CreateTransactionAsync(TransactionCreateDto transactionDto)
    {
        var user = await _context.Users.FindAsync(transactionDto.UserId);
        if (user == null)
        {
            throw new InvalidOperationException("User not found");
        }

        if (transactionDto.Type == TransactionType.Receita)
        {
            var age = AgeHelper.CalculateAge(user.DateOfBirth);
            if (age < 18)
            {
                throw new InvalidOperationException(
                    "Usuários menores de 18 anos não podem registrar receitas."
                );
            }
        }

        var newTransaction = new Transaction
        {
            Description = transactionDto.Description,
            Value = transactionDto.Value,
            Type = transactionDto.Type,
            UserId = transactionDto.UserId
        };

        await _context.Transactions.AddAsync(newTransaction);
        await _context.SaveChangesAsync();

        return newTransaction;
    }

    public async Task<IEnumerable<Transaction>> GetTransactionsByUserAsync(int userId)
    {
        return await _context.Transactions
            .Where(t => t.UserId == userId)
            .ToListAsync();
    }

    public async Task<bool> DeleteTransactionsByUserAsync(int userId)
    {
        var userTransactions = await _context.Transactions
            .Where(t => t.UserId == userId)
            .ToListAsync();

        if (userTransactions.Any())
        {
            _context.Transactions.RemoveRange(userTransactions);
            await _context.SaveChangesAsync();
        }

        return true;
    }
}