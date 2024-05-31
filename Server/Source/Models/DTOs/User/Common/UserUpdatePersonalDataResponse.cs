using System.ComponentModel.DataAnnotations;

namespace Server.Source.Models.DTOs.User.Common
{
    public class UserUpdatePersonalDataResponse
    {
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? PhoneNumber { get; set; }
    }
}
