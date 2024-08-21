using Server.Source.Models.Entities;

namespace Server.Source.Models.DTOs.Business.Cart
{
    public class CartElementResponse
    {
        public int Id { get; set; }
        public string? PersonName { get; set; }
        public string? ProductGuid { get; set; }
        public decimal ProductPrice { get; set; }
        public int ProductQuantity { get; set; }
        public bool IsForLater { get; set; }
        public string UserId { get; set; } = null!;
        public int ProductId { get; set; }
    }
}
