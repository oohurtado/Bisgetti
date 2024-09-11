using Server.Source.Models.Entities;

namespace Server.Source.Models.DTOs.Entities
{
    public class MenuStuffResponse
    {
        public int Id { get; set; }
        public string? Image { get; set; }
        public int? Position { get; set; }
        public bool IsVisible { get; set; }
        public bool IsAvailable { get; set; }
        public int? MenuId { get; set; }
        public int? CategoryId { get; set; }
        public int? ProductId { get; set; }
    }
}
