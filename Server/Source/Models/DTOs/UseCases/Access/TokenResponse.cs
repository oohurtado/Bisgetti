namespace Server.Source.Models.DTOs.UseCases.Access
{
    public class TokenResponse
    {
        public string? Token { get; set; }
        public DateTime? ExpiresIn { get; set; }
    }
}
