using Server.Source.Models.Entities;

namespace Server.Source.Models.DTOs.Entities
{
    public class OrderElementResponse
    {
        public string? ProductName { get; set; }
        public string? ProductDescription { get; set; }
        public string? ProductIngredients { get; set; }
        public decimal ProductPrice { get; set; }
        public int ProductQuantity { get; set; }
        public string? PersonName { get; set; }

        public int Id { get; set; }
        public int OrderId { get; set; }
    }
}
