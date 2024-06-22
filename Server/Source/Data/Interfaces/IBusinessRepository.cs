using Server.Source.Models.Entities;

namespace Server.Source.Data.Interfaces
{
    public interface IBusinessRepository
    {
        /// <summary>
        /// Guarda cambios
        /// </summary>
        Task UpdateAsync();

        /// <summary>
        /// Obtiene menus
        /// </summary>
        IQueryable<MenuEntity> GetMenusByPage(string sortColumn, string sortOrder, int pageSize, int pageNumber, string term, out int grandTotal);

        /// <summary>
        /// Obtiene menu
        /// </summary>
        IQueryable<MenuEntity> GetMenu(int id);

        /// <summary>
        /// Devuelve si existe o no el menu
        /// </summary>
        Task<bool> ExistsMenuAsync(int? id, string name);

        /// <summary>
        /// Crea menu
        /// </summary>
        Task CreateMenuAsync(MenuEntity menu);

        /// <summary>
        /// Borra menu
        /// </summary>
        Task DeleteMenuAsync(MenuEntity menu);
    }
}
