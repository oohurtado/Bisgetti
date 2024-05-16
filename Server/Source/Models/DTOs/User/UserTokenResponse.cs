namespace Server.Source.Models.DTOs.User
{
    public class UserTokenResponse
    {
        public string? Token { get; set; }
        public DateTime? ExpiresIn { get; set; }
    }
}
