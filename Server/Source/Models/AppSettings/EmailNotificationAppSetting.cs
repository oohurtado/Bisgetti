namespace Server.Source.Models.AppSettings
{
    public class EmailNotificationAppSetting
    {
        public string? Host { get; set; }
        public string? Port { get; set; }
        public string? User { get; set; }
        public string? Password { get; set; }
        public string? SenderEmail { get; set; }
        public string? SenderName { get; set; }
        public string? RecipientEmail { get; set; }
        public string? RecipientName { get; set; }
    }
}
