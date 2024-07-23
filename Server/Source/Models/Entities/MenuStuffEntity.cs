namespace Server.Source.Models.Entities
{
    public class MenuStuffEntity
    {
        /// <summary>
        /// Fields
        /// </summary>

        public string? Image { get; set; }

        /// <summary>
        /// Aplica a: categoría, producto
        /// </summary>
        public int? Position { get; set; }

        /// <summary>
        /// Aplica a: menú, categoría, producto
        /// </summary>
        public bool IsVisible { get; set; }

        /// <summary>
        /// Aplica a: menú, producto
        /// </summary>
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
