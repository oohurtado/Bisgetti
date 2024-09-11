namespace Server.Source.Models.DTOs.Entities
{
    public class UserResponse
    {
        public string? Id { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
        public string? UserRole { get; set; }
    }
}
