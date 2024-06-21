using Server.Source.Models.Entities;

namespace Server.Source.Data.Interfaces
{
    public interface IBusinessRepository
    {
        /// <summary>
        /// Obtiene menus
        /// </summary>
        IQueryable<MenuEntity> GetMenusByPage(string sortColumn, string sortOrder, int pageSize, int pageNumber, string term, out int grandTotal);

        /// <summary>
        /// Obtiene menu
        /// </summary>
        IQueryable<MenuEntity> GetMenu(int id);
    }
}
