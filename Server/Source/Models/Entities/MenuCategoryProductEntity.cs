namespace Server.Source.Models.Entities
{
    public class MenuCategoryProductEntity
    {
        /// <summary>
        /// Fields
        /// </summary>

        public string? ImagePath { get; set; }
        public int? Position { get; set; }
        public bool IsVisible { get; set; }
        public bool IsAvailable { get; set; }

        /// <summary>
        /// Relationships
        /// </summary>

        public int Id { get; set; }

        public int? MenuId { get; set; }
        public MenuEntity? Menu { get; set; }

        public int? CategoryId { get; set; }
        public CategoryEntity? Category { get; set; }

        public int? ProductId { get; set; }
        public ProductEntity? Product { get; set; }
    }
}
