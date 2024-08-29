using Server.Source.Models.Entities;
using System.Linq.Expressions;

namespace Server.Source.Data.Interfaces
{
    public partial interface IBusinessRepository
    {
        /// <summary>
        /// Guarda cambios
        /// </summary>
        Task UpdateAsync();        

        /* ***************************** menus ***************************** */

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

        /* ***************************** categorias ***************************** */

        /// <summary>
        /// Obtiene categorias
        /// </summary>
        IQueryable<CategoryEntity> GetCategoriesByPage(string sortColumn, string sortOrder, int pageSize, int pageNumber, string term, out int grandTotal);
        IQueryable<CategoryEntity> GetCategories();

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

        /* ***************************** productos ***************************** */

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
        /// Obteniendo Diseñar menú
        /// </summary>
        IQueryable<MenuStuffEntity> GetMenuStuff(Expression<Func<MenuStuffEntity, bool>> exp);

        /* ***************************** carro de compras ***************************** */

        IQueryable<PersonEntity> GetPeople(string userId);
        IQueryable<PersonEntity> GetPeople(string userId, Expression<Func<PersonEntity, bool>> exp);
        IQueryable<AddressEntity> GetAddresses(string userId);
        Task AddPersonToUser(PersonEntity person);
        Task AddProductCartAsync(CartElementEntity cartElement);
        IQueryable<CartElementEntity> GetProductsFromCart(string userId);
        Task<int> GetNumberOfProductsInCartAsync(string userId, Expression<Func<CartElementEntity, bool>> exp);
        Task DeleteProductFromCartAsync(CartElementEntity cartElement);
    }
}
