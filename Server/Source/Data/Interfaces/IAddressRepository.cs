﻿using Server.Source.Models.Entities;

namespace Server.Source.Data.Interfaces
{
    public interface IAddressRepository
    {
        /// <summary>
        /// Guarda cambios
        /// </summary>
        Task UpdateAsync();

        /// <summary>
        /// Obtiene direcciones
        /// </summary>
        IQueryable<AddressEntity> GetAddressesByPage(string userId, string sortColumn, string sortOrder, int pageSize, int pageNumber, string term, out int grandTotal);
        
        /// <summary>
        /// Obtiene direccion
        /// </summary>
        IQueryable<AddressEntity> GetAddress(string userId, int id);

        /// <summary>
        /// Crea direccion
        /// </summary>
        Task CreateAddressAsync(AddressEntity address);

        /// <summary>
        /// Devuelve si existe o no la direccion
        /// </summary>
        Task<bool> ExistsAsync(string userId, int? id, string name);

        /// <summary>
        /// Pone en falso IsDefault a todas las direcciones excepto a la enviada por parametro
        /// </summary>
        Task ResetDefaultAsync(string userId, int defaultAddressId);

        /// <summary>
        /// Borra direccion
        /// </summary>
        Task DeleteAddressAsync(AddressEntity address);
    }
}