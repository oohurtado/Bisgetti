using Server.Source.Models.Entities;

namespace Server.Source.Models.DTOs.Entities
{
    public class CartElementResponse
    {
        public int Id { get; set; }
        public string? PersonName { get; set; }
        public string? ProductName { get; set; }
        public decimal ProductPrice { get; set; }
        public int ProductQuantity { get; set; }
        public int ProductId { get; set; }
        public string? ProductImage { get; set; }
    }
}
