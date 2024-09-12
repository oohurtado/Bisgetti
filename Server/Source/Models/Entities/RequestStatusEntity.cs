namespace Server.Source.Models.Entities
{
    public class RequestStatusEntity
    {
        /// <summary>
        /// Fields
        /// </summary>
        
        public string? Status { get; set; }
        public DateTime? EventAt { get; set; }

        /// <summary>
        /// Relationships
        /// </summary>
        
        public int Id { get; set; }

        public int RequestId { get; set; }
        public RequestEntity Request { get; set; } = null!;
    }
}
