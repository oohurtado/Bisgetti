using Server.Source.Models.Entities;

namespace Server.Source.Data.Interfaces
{
    public interface IAddressRepository
    {

        /// <summary>
        /// Obtiene direcciones
        /// </summary>
        IQueryable<AddressEntity> GetAddressesByPage(string sortColumn, string sortOrder, int pageSize, int pageNumber, string term, out int grandTotal);
        
        /// <summary>
        /// Obtiene direccion
        /// </summary>
        IQueryable<AddressEntity> GetAddress(int id);

        /// <summary>
        /// Crea direccion
        /// </summary>
        Task CreateAddressAsync(AddressEntity entity);

        /// <summary>
        /// Guarda cambios
        /// </summary>
        Task SaveChangesAsync();
    }
}
