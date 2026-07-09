using System.Text.Json.Serialization;

namespace netApp.Models;

public class User
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public DateTime DateOfBirth { get; set; }
    
    [JsonIgnore]
    public int Age => CalculateAge(DateOfBirth);
    
    private static int CalculateAge(DateTime birthDate)
    {
        var today = DateTime.Today;
        var age = today.Year - birthDate.Year;
        if (birthDate.Date > today.AddYears(-age)) age--;
        return age;
    }
    
    public ICollection<Transaction>? Transactions { get; set; }
}