using System;
namespace netApp.Helpers;

public static class AgeHelper
{
    public static int CalculateAge(DateTime birthDate)
    {
        var today = DateTime.Today;
        var age = today.Year - birthDate.Year;
        if (birthDate.Date > today.AddYears(-age)) age--;
        return age;
    }

    public static bool IsUnder18(DateTime birthDate)
    {
        return CalculateAge(birthDate) < 18;
    }
}