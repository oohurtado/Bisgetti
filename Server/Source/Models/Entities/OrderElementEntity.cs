namespace Server.Source.Models.Entities
{
    public class OrderElementEntity
    {
        /// <summary>
        /// Fields
        /// </summary>

        public string? ProductName { get; set; }
        public string? ProductDescription { get; set; }
        public string? ProductIngredients { get; set; }
        public decimal ProductPrice { get; set; }
        public int ProductQuantity { get; set; }
        public string? PersonName { get; set; }


        /// <summary>
        /// Relationships
        /// </summary>

        public int Id { get; set; }

        public int OrderId { get; set; }
        public OrderEntity Order { get; set; } = null!;
    }
}
