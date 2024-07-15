using Server.Source.Models.Entities;

namespace Server.Source.Data.Interfaces
{
    public partial interface IBusinessRepository
    {
        /// <summary>
        /// Obtiene productos
        /// </summary>
        IQueryable<ProductEntity> GetProductsByPage(string sortColumn, string sortOrder, int pageSize, int pageNumber, string term, out int grandTotal);
        IQueryable<ProductEntity> GetProducts();

        /// <summary>
        /// Obtiene producto
        /// </summary>
        IQueryable<ProductEntity> GetProduct(int id);

        /// <summary>
        /// Devuelve si existe o no el product
        /// </summary>
        Task<bool> ExistsProductAsync(int? id, string name);

        /// <summary>
        /// Crea producto
        /// </summary>
        Task CreateProductAsync(ProductEntity product);

        /// <summary>
        /// Borra producto
        /// </summary>
        Task DeleteProductAsync(ProductEntity product);

        /// <summary>
        /// Obtiene cosas del menu
        /// </summary>
        /// <param name="menuId"></param>
        /// <returns></returns>
        IQueryable<MenuStuffEntity> GetMenuStuff(int menuId);
    }
}
