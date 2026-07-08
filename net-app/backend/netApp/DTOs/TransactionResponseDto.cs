using netApp.Models;
using System.Text.Json.Serialization;
using System.ComponentModel.DataAnnotations;

namespace netApp.DTOs;

public class TransactionResponseDto
{
    public int Id { get; set; }
    public string Description { get; set; } = string.Empty;
    public decimal Value { get; set; }
    
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public TransactionType Type { get; set; }
    
    public int UserId { get; set; }
    public string UserName { get; set; } = string.Empty;
}