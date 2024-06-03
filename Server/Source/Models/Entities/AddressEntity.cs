namespace Server.Source.Models.Entities
{
    public class AddressEntity
    {
        /// <summary>
        /// Fields
        /// </summary>

        public string? Name { get; set; }
        public string? Country { get; set; }
        public string? State { get; set; }
        public string? Suburb { get; set; } // Colonia / Suburbio
        public string? Street { get; set; }
        public string? InteriorNumber { get; set; }
        public string? ExteriorNumber { get; set; }
        public string? PostalCode { get; set; }
        public string? PhoneNumber { get; set; }
        public string? MoreInstructions { get; set; }
        public bool IsDefault { get; set; }

        /// <summary>
        /// Relationships
        /// </summary>

        public int Id { get; set; }

        public string UserId { get; set; } = null!;
        public UserEntity User { get; set; } = null!;
    }
}
