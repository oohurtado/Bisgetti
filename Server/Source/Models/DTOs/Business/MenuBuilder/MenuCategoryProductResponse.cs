using Server.Source.Models.Entities;

namespace Server.Source.Models.DTOs.Business.MenuBuilder
{
    public class MenuCategoryProductResponse
    {
        public int Id { get; set; }
        public string? ImagePath { get; set; }
        public int? Position { get; set; }
        public bool IsVisible { get; set; }
        public bool IsAvailable { get; set; }
        public bool IsSoldOut { get; set; }
        public int? MenuId { get; set; }
        public int? CategoryId { get; set; }
        public int? ProductId { get; set; }
    }
}
