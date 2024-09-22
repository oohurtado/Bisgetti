namespace Server.Source.Models.DTOs.Entities
{
    public class OrderStatusResponse
    {
        public int Id { get; set; }
        public int OrderId { get; set; }
        public string? Status { get; set; }
        public DateTime? EventAt { get; set; }
    }
}
