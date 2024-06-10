using static Server.Source.Services.EmailNotificationService;

namespace Server.Source.Services.Interfaces
{
    public interface INotificationService
    {
        void SetConfigurations();
        void SetMessage(string subject, string body, bool isBodyHtml = true);
        Task SendEmailAsync();
        void SetRecipient(string email, string name, RecipientType recipientType);
    }
}
