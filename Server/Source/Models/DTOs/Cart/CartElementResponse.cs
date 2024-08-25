using Server.Source.Models.Entities;

namespace Server.Source.Models.DTOs.Cart
{
    public class CartElementResponse
    {
        public int Id { get; set; }
        public string? PersonName { get; set; }
        public decimal ProductPriceOld { get; set; }
        public decimal ProductPriceNew { get; set; }
        public int ProductQuantity { get; set; }
        public int ProductId { get; set; }
    }
}
