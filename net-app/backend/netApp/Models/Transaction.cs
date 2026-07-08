using System.Text.Json.Serialization;

namespace netApp.Models;

public class Transaction
{
    public int Id { get; set; }
    public string Description { get; set; } = string.Empty;
    public decimal Value { get; set; }
    
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public TransactionType Type { get; set; }
    
    public int UserId { get; set; }
    [JsonIgnore]
    public User? User { get; set; }
}

public enum TransactionType
{
    Receita,
    Despesa
}