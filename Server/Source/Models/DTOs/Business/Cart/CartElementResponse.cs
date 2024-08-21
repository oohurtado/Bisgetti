using Server.Source.Models.Entities;

namespace Server.Source.Models.DTOs.Business.Cart
{
    public class CartElementResponse
    {
        public int Id { get; set; }
        public string? PersonName { get; set; }
        public decimal OldProductPrice { get; set; }
        public decimal NewProductPrice { get; set; }
        public int ProductQuantity { get; set; }
        public bool IsForLater { get; set; }
        public int ProductId { get; set; }
    }
}
