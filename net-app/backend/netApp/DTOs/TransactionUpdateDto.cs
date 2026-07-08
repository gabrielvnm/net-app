using netApp.Models;
using System.Text.Json.Serialization;
using System.ComponentModel.DataAnnotations;

namespace netApp.DTOs;

public class TransactionUpdateDto
{
    [Required(ErrorMessage = "Description is required")]
    [MinLength(1, ErrorMessage = "Description must be at least 1 character")]
    [MaxLength(100, ErrorMessage = "Description cannot exceed 100 characters")]
    public string Description { get; set; } = string.Empty;

    [Required(ErrorMessage = "Value is required")]
    [Range(0.01, double.MaxValue, ErrorMessage = "Value must be greater than 0")]
    public decimal Value { get; set; }
    
    [Required(ErrorMessage = "Transaction type is required")]
    [EnumDataType(typeof(TransactionType), ErrorMessage = "Invalid transaction type. Must be 'Receita' or 'Despesa'")]
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public TransactionType? Type { get; set; }
}