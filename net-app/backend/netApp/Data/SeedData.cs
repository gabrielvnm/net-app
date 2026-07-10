using netApp.Models;

namespace netApp.Data;

public static class SeedData
{
    public static void Initialize(AppDbContext context)
    {
        // Verifica se já existem usuários
        if (context.Users.Any())
        {
            return;
        }

        // Usuários de teste
        var users = new[]
        {
            new User 
            { 
                Name = "João Silva Santos", 
                DateOfBirth = new DateTime(1995, 6, 15) 
            },
            new User 
            { 
                Name = "Maria Oliveira Costa", 
                DateOfBirth = new DateTime(1980, 3, 22) 
            },
            new User 
            { 
                Name = "Pedro Henrique Souza", 
                DateOfBirth = new DateTime(2000, 11, 1) 
            },
            new User 
            { 
                Name = "Ana Beatriz Lima", 
                DateOfBirth = new DateTime(2008, 7, 19) 
            },
            new User 
            { 
                Name = "Carlos Eduardo Pereira", 
                DateOfBirth = new DateTime(2009, 12, 5) 
            }
        };

        context.Users.AddRange(users);
        context.SaveChanges();

        // Transações de teste
        var transactions = new[]
        {
            new Transaction
            {
                Description = "Salário Mensal",
                Value = 3500.00m,
                Type = TransactionType.Receita,
                UserId = 1  // João
            },
            new Transaction
            {
                Description = "Pagamento de Luz",
                Value = 250.00m,
                Type = TransactionType.Despesa,
                UserId = 2  // Maria
            },
            new Transaction
            {
                Description = "Compras no Mercado",
                Value = 150.00m,
                Type = TransactionType.Despesa,
                UserId = 4  // Ana (menor)
            },
            new Transaction
            {
                Description = "Material Escolar",
                Value = 80.00m,
                Type = TransactionType.Despesa,
                UserId = 5  // Carlos (menor)
            }
        };

        context.Transactions.AddRange(transactions);
        context.SaveChanges();
    }
}