namespace Server.Source.Models.Entities
{
    public class OrderStatusEntity
    {
        /// <summary>
        /// Fields
        /// </summary>
        
        public string? Status { get; set; }
        public DateTime? EventAt { get; set; }

        /// <summary>
        /// Relationships
        /// </summary>
        
        public int Id { get; set; }

        public int OrderId { get; set; }
        public OrderEntity Order { get; set; } = null!;
    }
}
