namespace Server.Source.Models.DTOs.Entities
{
    public class MenuResponse
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public bool IsVisible { get; set; }
        public bool IsAvailable { get; set; }
    }
}
