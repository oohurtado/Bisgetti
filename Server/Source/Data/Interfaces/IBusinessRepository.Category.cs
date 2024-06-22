using Server.Source.Models.Entities;

namespace Server.Source.Data.Interfaces
{
    public partial interface IBusinessRepository
    {
        /// <summary>
        /// Obtiene categorias
        /// </summary>
        IQueryable<CategoryEntity> GetCategoriesByPage(string sortColumn, string sortOrder, int pageSize, int pageNumber, string term, out int grandTotal);

        /// <summary>
        /// Obtiene cateoria
        /// </summary>
        IQueryable<CategoryEntity> GetCategory(int id);

        /// <summary>
        /// Devuelve si existe o no el categoria
        /// </summary>
        Task<bool> ExistsCategoryAsync(int? id, string name);

        /// <summary>
        /// Crea cateoria
        /// </summary>
        Task CreateCategoryAsync(CategoryEntity cateogry);

        /// <summary>
        /// Borra cateoria
        /// </summary>
        Task DeleteCategoryAsync(CategoryEntity cateogry);
    }
}
