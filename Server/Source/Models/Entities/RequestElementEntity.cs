namespace Server.Source.Models.Entities
{
    public class RequestElementEntity
    {
        /// <summary>
        /// Fields
        /// </summary>

        public string? ProductName { get; set; }
        public string? ProductDescription { get; set; }
        public string? ProductIngredients { get; set; }
        public decimal ProductPrice { get; set; }
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
