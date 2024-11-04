namespace Server.Source.Models.Entities
{
    public class ConfigurationEntity
    {
        public int Id { get; set; }
        public string? Section { get; set; }
        public string? Key { get; set; }
        public string? Value { get; set; }
        public string? ExtraValue { get; set; }
    }
}
