using Server.Source.Models.AppSettings;
using Server.Source.Services.Interfaces;
using Server.Source.Utilities;
using System.Net.Mail;

namespace Server.Source.Services
{
    public class EmailNotificationService : INotificationService
    {
        private readonly ConfigurationUtility _configurationUtility;

        private MailMessage _mailMessage;
        private SmtpClient _smtpClient;

        public enum RecipientType
        {
            Recipient,
            CC,
            Bcc,
        }

        public EmailNotificationService(ConfigurationUtility configurationUtility)
        {
            _mailMessage = new MailMessage();
            _smtpClient = new SmtpClient();

            _configurationUtility = configurationUtility;
            SetConfigurations();
        }

        public void SetConfigurations()
        {
            var settings = _configurationUtility.GetEmailNotification();

            _smtpClient.Host = settings.Host!;
            _smtpClient.Port = int.Parse(settings.Port!);
            _smtpClient.EnableSsl = true;
            _smtpClient.Credentials = new System.Net.NetworkCredential(settings.User, settings.Password);

            _mailMessage.From = new MailAddress(settings.SenderEmail!, settings.SenderName);
            _mailMessage.Priority = MailPriority.Normal;
            SetRecipient(settings.RecipientEmail!, name: settings.RecipientName!, RecipientType.Recipient);
        }

        public void SetMessage(string subject, string body, bool isBodyHtml = true)
        {
            _mailMessage.Subject = subject;
            _mailMessage.Body = body;
            _mailMessage.IsBodyHtml = isBodyHtml;
        }

        public void SetRecipient(string email, string name = "", RecipientType recipientType = RecipientType.Recipient)
        {
            if (recipientType == RecipientType.Recipient)
            {
                if (string.IsNullOrEmpty(name))
                {
                    _mailMessage.To.Add(email);
                }
                else
                {
                    _mailMessage.To.Add(new MailAddress(email, name));
                }
            }
            else if (recipientType == RecipientType.CC)
            {
                if (string.IsNullOrEmpty(name))
                {
                    _mailMessage.CC.Add(email);
                }
                else
                {
                    _mailMessage.CC.Add(new MailAddress(email, name));
                }
            }
            else if (recipientType == RecipientType.Bcc)
            {
                if (string.IsNullOrEmpty(name))
                {
                    _mailMessage.Bcc.Add(email);
                }
                else
                {
                    _mailMessage.Bcc.Add(new MailAddress(email, name));
                }
            }
        }

        public async Task SendEmailAsync()
        {
            try
            {
                var mainAppSetting = _configurationUtility.GetMain();
                if (mainAppSetting.SendEmailsAvailable)
                {    
                    await _smtpClient.SendMailAsync(_mailMessage);
                }
            }
            catch
            {
                // TODO: log crash
            }
        }
    }
}
