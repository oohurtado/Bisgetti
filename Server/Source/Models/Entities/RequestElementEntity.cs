namespace Server.Source.Models.Entities
{
    public class RequestElementEntity
    {
        /// <summary>
        /// Fields
        /// </summary>

        public string? ProductJson { get; set; }       
        public int ProductQuantity { get; set; }
        public string? PersonName { get; set; }


        /// <summary>
        /// Relationships
        /// </summary>

        public int Id { get; set; }

        public int RequestId { get; set; }
        public RequestEntity Request { get; set; } = null!;
    }
}
