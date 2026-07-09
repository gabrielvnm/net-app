using System.ComponentModel.DataAnnotations;

namespace netApp.DTOs;

public class UserUpdateDto
{
    [MinLength(2, ErrorMessage = "Name must be at least 2 characters")]
    [MaxLength(100, ErrorMessage = "Name cannot exceed 100 characters")]
    public string? Name { get; set; }

    [Range(1, 150, ErrorMessage = "Age must be between 1 and 150")]
    public int? Age { get; set; }
}