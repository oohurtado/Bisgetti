﻿namespace Server.Source.Models.Entities
{
    public class RequestEntity
    {
        public RequestEntity()
        {
            RequestElements = [];
            RequestStatuses = [];
        }

        /// <summary>
        /// Fields
        /// </summary>

        public string? DeliveryMethod { get; set; }
        public decimal? TipPercent { get; set; }
        public decimal? ShippingCost { get; set; }                
        public string? AddressJson { get; set; } // AddressJson

        /// <summary>
        /// Relationships
        /// </summary>

        public int Id { get; set; }

        public string UserId { get; set; } = null!;
        public UserEntity User { get; set; } = null!;

        public ICollection<RequestElementEntity> RequestElements { get; set; }
        public ICollection<RequestStatusEntity> RequestStatuses { get; set; }
    }

    public class AddressJson
    {
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