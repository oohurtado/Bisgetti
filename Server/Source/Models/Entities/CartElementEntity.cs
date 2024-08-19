namespace Server.Source.Models.Entities
{
    public class CartElementEntity
    {
        /// <summary>
        /// Fields
        /// </summary>

        public string? PersonName { get; set; }

        /// <summary>
        /// Si guid es diferente del original entonces hubo cambios en el precio
        /// </summary>
        public string? ProductGuid { get; set; }

        /// <summary>
        /// Si guid es diferente del original entonces hubo cambios en el precio
        /// </summary>
        public decimal ProductPrice { get; set; }

        public int ProductQuantity { get; set; }

        public bool IsForLater { get; set; }

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
