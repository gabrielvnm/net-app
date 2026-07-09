using netApp.Models;
using netApp.DTOs;

namespace netApp.Services;

public interface ITransactionService
{
    Task<IEnumerable<Transaction>> GetAllTransactionsAsync(int? userId = null, TransactionType? type = null);
    Task<Transaction?> GetTransactionByIdAsync(int id);
    Task<Transaction> CreateTransactionAsync(TransactionCreateDto transactionDto);
    Task<IEnumerable<Transaction>> GetTransactionsByUserAsync(int userId);
    Task<bool> DeleteTransactionsByUserAsync(int userId); // Keep for cascade delete
}