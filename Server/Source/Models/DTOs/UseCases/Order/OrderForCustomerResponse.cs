using Server.Source.Models.DTOs.Entities;
using System.Text.Json;

namespace Server.Source.Models.DTOs.UseCases.Order
{
    public class OrderForCustomerResponse
    {
        public OrderForCustomerResponse(string? addressJson)
        {
            if (!string.IsNullOrEmpty(addressJson))
            {
                Address = JsonSerializer.Deserialize<AddressResponse>(addressJson);
            }
        }

        public int Id { get; set; }
        public string? DeliveryMethod { get; set; }
        public decimal? TipPercent { get; set; }
        public DateTime CreatedAt { get; set; }
        public string? Comments { get; set; }
        public decimal? ShippingCost { get; set; }
        public List<string>? PersonNames { get; set; }
        public decimal ProductsSum { get; set; }
        public decimal ProductsCount { get; set; }
        public AddressResponse? Address { get; set; }
        public OrderStatusResponse? OrderStatus { get; set; }
    }
}
