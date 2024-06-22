using Server.Source.Models.Entities;

namespace Server.Source.Data.Interfaces
{
    public partial interface IBusinessRepository
    {
        /// <summary>
        /// Guarda cambios
        /// </summary>
        Task UpdateAsync();   
    }
}
