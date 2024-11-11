namespace Server.Source.Models.DTOs.UseCases.Configuration
{
    public class UpdateOrderConfigurationResponse
    {
        public string? Tip { get; set; }
        public string? Shipping { get; set; }
        public bool Active { get; set; }
    }
}
