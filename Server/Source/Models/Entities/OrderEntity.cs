namespace Server.Source.Models.Entities
{
    public class OrderEntity
    {
        public OrderEntity()
        {
            OrderElements = [];
            OrderStatuses = [];
        }

        /// <summary>
        /// Fields
        /// </summary>

        public string? DeliveryMethod { get; set; }
        public decimal? TipPercent { get; set; }
        public decimal? ShippingCost { get; set; }                
        public string? AddressJson { get; set; }
        public string? Comments { get; set; }
        public decimal? PayingWith { get; set; }

        /// <summary>
        /// Relationships
        /// </summary>

        public int Id { get; set; }

        public string UserId { get; set; } = null!;
        public UserEntity User { get; set; } = null!;

        public ICollection<OrderElementEntity> OrderElements { get; set; }
        public ICollection<OrderStatusEntity> OrderStatuses { get; set; }
    }
}
