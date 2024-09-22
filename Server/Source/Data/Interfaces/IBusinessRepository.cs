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
        IQueryable<MenuEntity> Menu_GetMenusByPage(string sortColumn, string sortOrder, int pageSize, int pageNumber, string term, out int grandTotal);

        /// <summary>
        /// Obtiene menu
        /// </summary>
        IQueryable<MenuEntity> Menu_GetMenu(int id);

        /// <summary>
        /// Devuelve si existe o no el menu
        /// </summary>
        Task<bool> Menu_ExistsMenuAsync(int? id, string name);

        /// <summary>
        /// Crea menu
        /// </summary>
        Task Menu_CreateMenuAsync(MenuEntity menu);

        /// <summary>
        /// Borra menu
        /// </summary>
        Task Menu_DeleteMenuAsync(MenuEntity menu);

        /* ***************************** categorias ***************************** */

        /// <summary>
        /// Obtiene categorias
        /// </summary>
        IQueryable<CategoryEntity> Category_GetCategoriesByPage(string sortColumn, string sortOrder, int pageSize, int pageNumber, string term, out int grandTotal);
        IQueryable<CategoryEntity> Category_GetCategories();

        /// <summary>
        /// Obtiene cateoria
        /// </summary>
        IQueryable<CategoryEntity> Category_GetCategory(int id);

        /// <summary>
        /// Devuelve si existe o no el categoria
        /// </summary>
        Task<bool> Category_ExistsCategoryAsync(int? id, string name);

        /// <summary>
        /// Crea cateoria
        /// </summary>
        Task Category_CreateCategoryAsync(CategoryEntity cateogry);

        /// <summary>
        /// Borra cateoria
        /// </summary>
        Task Category_DeleteCategoryAsync(CategoryEntity cateogry);

        /* ***************************** productos ***************************** */

        /// <summary>
        /// Obtiene productos
        /// </summary>
        IQueryable<ProductEntity> Product_GetProductsByPage(string sortColumn, string sortOrder, int pageSize, int pageNumber, string term, out int grandTotal);
        IQueryable<ProductEntity> Product_GetProducts();

        /// <summary>
        /// Obtiene producto
        /// </summary>
        IQueryable<ProductEntity> Product_GetProduct(int id);

        /// <summary>
        /// Devuelve si existe o no el product
        /// </summary>
        Task<bool> Product_ExistsProductAsync(int? id, string name);

        /// <summary>
        /// Crea producto
        /// </summary>
        Task Product_CreateProductAsync(ProductEntity product);

        /// <summary>
        /// Borra producto
        /// </summary>
        Task Product_DeleteProductAsync(ProductEntity product);

        /* ***************************** menu stuff ***************************** */

        /// <summary>
        /// Obtiene cosas del menu
        /// </summary>
        /// <param name="menuId"></param>
        /// <returns></returns>
        IQueryable<MenuStuffEntity> MenuStuff_GetMenuStuff(int menuId);

        /// <summary>
        /// Agrega elemento al menu
        /// </summary>
        Task MenuStuff_AddElementAsync(MenuStuffEntity element);

        /// <summary>
        /// Quitar elemento del menu
        /// </summary>
        /// <param name="element"></param>
        /// <returns></returns>
        Task MenuStuff_RemoveElementAsync(Expression<Func<MenuStuffEntity, bool>> exp);

        /// <summary>
        /// Posicion del ultimo elemento
        /// </summary>
        /// <param name="exp"></param>
        /// <returns></returns>
        Task<int?> MenuStuff_GetPositionFromLastElementAsync(Expression<Func<MenuStuffEntity, bool>> exp);

        /// <summary>
        /// Checa si elemento existe
        /// </summary>
        Task<bool> MenuStuff_ElementExistsAsync(Expression<Func<MenuStuffEntity, bool>> exp);

        /// <summary>
        /// Obteniendo Diseñar menú
        /// </summary>
        IQueryable<MenuStuffEntity> MenuStuff_GetMenuStuff(Expression<Func<MenuStuffEntity, bool>> exp);

        /* ***************************** carro de compras ***************************** */

        IQueryable<PersonEntity> Cart_GetPeople(string userId);
        IQueryable<PersonEntity> Cart_GetPeople(string userId, Expression<Func<PersonEntity, bool>> exp);
        IQueryable<AddressEntity> Cart_GetAddresses(string userId);
        Task Cart_AddPersonToUser(PersonEntity person);
        Task Cart_AddProductToCartAsync(CartElementEntity cartElement);
        IQueryable<CartElementEntity> Cart_GetProductsFromCart(string userId);
        Task<int> Cart_GetNumberOfProductsInCartAsync(string userId, Expression<Func<CartElementEntity, bool>> exp);
        Task<decimal> Cart_GetTotalOfProductsInCartAsync(string userId, Expression<Func<CartElementEntity, bool>> exp);
        Task Cart_DeleteProductFromCartAsync(CartElementEntity cartElement);
        Task Cart_CreateOrderAsync(string userId, OrderEntity order_toCreate, List<int> cartElementIds);

        /* ***************************** pedidos ***************************** */
        IQueryable<OrderEntity> Order_GetOrdersByPage(string userId, string sortColumn, string sortOrder, int pageSize, int pageNumber, out int grandTotal);
        IQueryable<OrderElementEntity> Order_GetOrderElements(string userId, int orderId);
        IQueryable<OrderStatusEntity> Order_GetOrderStatuses(string userId, int orderId);
    }
}
