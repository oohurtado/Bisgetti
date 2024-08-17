namespace Server.Source.Models.Entities
{
    public class CartElementEntity
    {
        /// <summary>
        /// Fields
        /// </summary>

        public string? ProductGuid { get; set; }
        public int Quantity { get; set; }
        public string? PersonName { get; set; }
                        
        public decimal Price { get; set; }

        /// <summary>
        /// Relationships
        /// </summary>

        public int Id { get; set; }

        public string UserId { get; set; } = null!;
        public UserEntity User { get; set; } = null!;

        public int ProductId { get; set; }
        public ProductEntity Product { get; set; } = null!;
    }
}
