namespace Server.Source.Models.DTOs.Cart
{
    public class AddressResponse
    {
        public int Id { get; set; }

        public string? Name { get; set; }
        public string? Country { get; set; }
        public string? State { get; set; }
        public string? City { get; set; } // Ciudad / Municipio
        public string? Suburb { get; set; } // Colonia / Suburbio
        public string? Street { get; set; }
        public string? InteriorNumber { get; set; }
        public string? ExteriorNumber { get; set; }
        public string? PostalCode { get; set; }
        public string? PhoneNumber { get; set; }
        public string? MoreInstructions { get; set; }
        public bool IsDefault { get; set; }
    }
}
