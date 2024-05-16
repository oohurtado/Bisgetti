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
    }
}
