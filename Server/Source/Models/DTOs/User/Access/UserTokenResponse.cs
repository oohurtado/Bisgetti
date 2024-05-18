namespace Server.Source.Models.DTOs.User.Access
{
    public class UserTokenResponse
    {
        public string? Token { get; set; }
        public DateTime? ExpiresIn { get; set; }
    }
}
