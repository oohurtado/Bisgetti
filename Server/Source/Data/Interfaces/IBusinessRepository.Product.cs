using Server.Source.Models.Entities;
using System.Linq.Expressions;

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

        /// <summary>
        /// Agrega elemento al menu
        /// </summary>
        Task AddElementAsync(MenuStuffEntity element);

        /// <summary>
        /// Quitar elemento del menu
        /// </summary>
        /// <param name="element"></param>
        /// <returns></returns>
        Task RemoveElementAsync(Expression<Func<MenuStuffEntity, bool>> exp);

        /// <summary>
        /// Posicion del ultimo elemento
        /// </summary>
        /// <param name="exp"></param>
        /// <returns></returns>
        Task<int?> GetPositionFromLastElementAsync(Expression<Func<MenuStuffEntity, bool>> exp);

        /// <summary>
        /// Checa si elemento existe
        /// </summary>
        Task<bool> ElementExistsAsync(Expression<Func<MenuStuffEntity, bool>> exp);

        /// <summary>
        /// Obteniendo cosas del menú
        /// </summary>
        IQueryable<MenuStuffEntity> GetMenuStuff(Expression<Func<MenuStuffEntity, bool>> exp);
    }
}
