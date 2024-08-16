namespace Server.Source.Models.DTOs.Business.Product
{
    public class ProductResponse
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public string? Ingredients { get; set; }
        public decimal Price { get; set; }
        public string? Guid { get; set; }
    }
}
