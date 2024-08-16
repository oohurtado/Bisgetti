namespace Server.Source.Models.Entities
{
    public class ProductEntity
    {
        public ProductEntity()
        {
            MenuStuff = [];
        }

        /// <summary>
        /// Fields
        /// </summary>

        public string? Name { get; set; }
        public string? Description { get; set; }
        public string? Ingredients { get; set; }
        public decimal Price { get; set; }
        public string? Guid { get; set; }

        /// <summary>
        /// Relationships
        /// </summary>

        public int Id { get; set; }

        public ICollection<MenuStuffEntity>? MenuStuff { get; set; }
    }
}
