namespace Server.Source.Models.DTOs.User.Access
{
    public class TokenResponse
    {
        public string? Token { get; set; }
        public DateTime? ExpiresIn { get; set; }
    }
}
