namespace Server.Source.Models.Hubs
{
    public class MessageOrderHub
    {
        public string? UserId { get; set; }
        public string? Message { get; set; }

        public string? RoleFrom { get; set; }
        public string? RoleTo { get; set; }
        
        public string? ExtraData { get; set; }

    }
}
