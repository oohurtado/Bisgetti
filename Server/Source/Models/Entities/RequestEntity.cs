namespace Server.Source.Models.Entities
{
    public class RequestEntity
    {
        public RequestEntity()
        {
            RequestElements = [];
        }

        /// <summary>
        /// Fields
        /// </summary>

        public string? DeliveryMethod { get; set; }
        public decimal? Tip { get; set; }
        public decimal? ShippingCost { get; set; }
        public string? StatusTracking { get; set; } // StatusTracking

        /// <summary>
        /// Relationships
        /// </summary>

        public int Id { get; set; }

        public string UserId { get; set; } = null!;
        public UserEntity User { get; set; } = null!;

        public ICollection<RequestElementEntity> RequestElements { get; set; }
    }

    public class StatusTracking
    {
        public string? Status { get; set; }
        public DateTime? EventAt { get; set; }
    }
}
