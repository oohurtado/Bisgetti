namespace Server.Source.Models.Entities
{
    public class CategoryEntity
    {
        public CategoryEntity()
        {
            MenuCategoryProducts = [];
        }

        /// <summary>
        /// Fields
        /// </summary>

        public string? Name { get; set; }
        public string? Description { get; set; }

        /// <summary>
        /// Relationships
        /// </summary>
        
        public int Id { get; set; }

        public ICollection<MenuCategoryProductEntity>? MenuCategoryProducts { get; set; }
    }
}
