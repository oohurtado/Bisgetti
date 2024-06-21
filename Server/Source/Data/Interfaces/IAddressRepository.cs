using Server.Source.Models.Entities;

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
        IQueryable<AddressEntity> GetAddresses(string userId);
        
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

        /// <summary>
        /// Cuenta direcciones
        /// </summary>
        Task<int> CountAsync(string userId);
    }
}
