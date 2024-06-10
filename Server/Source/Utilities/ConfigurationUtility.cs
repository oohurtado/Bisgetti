using Server.Source.Models.AppSettings;

namespace Server.Source.Utilities
{
    public class ConfigurationUtility
    {
        private readonly IConfiguration _configuration;

        public ConfigurationUtility(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public List<string> GetAdminEmails()
        {
            return _configuration["Admin:Emails"]!.Split(",").ToList();
        }

        public string GetJWTKey()
        {
            return _configuration["JWT:Key"]!;
        }

        public EmailNotificationAppSetting GetEmailNotification()
        {
            var appSettingsSection = _configuration.GetSection("EmailNotification");
            var settings = appSettingsSection.Get<EmailNotificationAppSetting>()!;
            return settings;            
        }

        public RestaurantInformationAppSetting GetRestaurantInformation()
        {
            var appSettingsSection = _configuration.GetSection("RestaurantInformation");
            var settings = appSettingsSection.Get<RestaurantInformationAppSetting>()!;
            return settings;
        }

        public MainAppSetting GetMain()
        {
            var appSettingsSection = _configuration.GetSection("Main");
            var settings = appSettingsSection.Get<MainAppSetting>()!;
            return settings;
        }
    }
}
