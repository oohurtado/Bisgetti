using Microsoft.AspNetCore.Identity;
using System;

namespace Server.Source.Models.Entities
{
    public class UserEntity : IdentityUser
    {
        public UserEntity()
        {
            Addresses = [];
            People = [];
            CartElements = [];
        }

        /// <summary>
        /// Fields
        /// </summary>

        public string? FirstName { get; set; }
        public string? LastName { get; set; }

        /// <summary>
        /// Relationships
        /// </summary>

        public ICollection<AddressEntity> Addresses { get; set; }
        public ICollection<PersonEntity> People { get; set; }
        public ICollection<CartElementEntity> CartElements { get; set; }
    }
}
