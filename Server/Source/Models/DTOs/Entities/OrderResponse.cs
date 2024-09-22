using System.Text.Json;

namespace Server.Source.Models.DTOs.Entities
{
    public class OrderResponse
    {
        public int Id { get; set; }
        public string? DeliveryMethod { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public string? Comments { get; set; }
        public decimal? TipPercent { get; set; }
        public decimal? PayingWith { get; set; }
        public decimal? ProductTotal { get; set; }
        public int? ProductCount { get; set; }
        public decimal? ShippingCost { get; set; }
        public string? AddressName { get; set; }
        public string? AddressJson { get; set; }
        public string? Status { get; set; }

        public List<OrderStatusResponse>? OrderStatuses { get; set; }
        public List<OrderElementResponse>? OrderElements { get; set; }
        public AddressResponse? Address { get; set; }
    }
}
