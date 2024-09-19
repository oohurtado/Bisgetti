namespace Server.Source.Models.Entities
{
    public class OrderElementEntity
    {
        /// <summary>
        /// Fields
        /// </summary>

        public string? ProductJson { get; set; }       
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
