using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace Server.Source.Models.Enums
{
    public enum EnumResponseError
    {
        [Description("Error interno del servidor. Vuelva a intentarlo más tarde.")]
        InternalServerError,

        /// <summary>
        /// usuarios
        /// </summary>

        [Description("El correo electrónico del usuario ya existe")]
        User_UserEmailAlreadyExists,

        [Description("Credenciales incorrectas, verifique su correo electrónico o contraseña")]
        User_UserWrongCredentials,

        [Description("Usuario no encontrado")]
        User_UserNotFound,

        [Description("Ha sucedido un error al intentar cambiar la contraseña")]
        User_UserErrorChangingPassword,

        [Description("Error al actualizar los datos personales")]
        User_UserErrorUpdaingPersonalData,

        /// <summary>
        /// usuarios - roles
        /// </summary>

        [Description("Acción no permitida, no se le puede quitar el rol Administrador a un Administrador")]
        UserRole_RemoveAdminRoleToAdminUser,

        [Description("Acción no permitida, no se puede cambiar el rol a un mismo usuario")]
        UserRole_ChangeRoleToItself,

        [Description("Acción no permitida, no se puede realizar el cambio de rol ya que el rol actual y el nuevo rol son el mismo")]
        UserRole_UserOldRoleAndNewRoleAreTheSame,

        [Description("Acción no permitida, no se puede asignar el rol Administrador desde la web")]
        UserRole_AdminRoleNotPossibleToAssign,

        [Description("Acción no permitida, un rol Jefe no puede asignar rol Jefe a otro usuario, solo un administrador puede realizar esta accion")]
        UserRole_BossRoleCantAssignBossRole,

        //[Description("El usuario no tiene un rol de tipo 'Usuario' asignado")]
        //UserWithoutUserRole,

        //[Description("No se puede asignar el rol Administrador")]
        //UserNewRoleAdminNotPossible,

        //[Description("No se puede asignar el rol Administrador")]
        //UserNewRoleBossNotPossible,

        /// <summary>
        /// paginacion
        /// </summary>

        [Description("No se encontó la columna de ordenamiento")]
        Pagination_SortColumnKeyNotFound,

        /// <summary>
        /// direcciones
        /// </summary>

        [Description("Dirección no encontrada")]
        Address_AddressNotFound,

        [Description("La dirección ya existe")]
        Address_AddressAlreadyExists,

        [Description("Has llegado al límite de direcciones que se pueden crear")]
        Address_AddressCreateLimit,

        /// <summary>
        /// menus
        /// </summary>
        
        [Description("Menú no encontrado")]
        Menu_MenuNotFound,

        [Description("El menú ya existe")]
        Menu_MenuAlreadyExists,

        /// <summary>
        /// categorias
        /// </summary>

        [Description("Categoría no encontrada")]
        Category_CategoryNotFound,

        [Description("La categoría ya existe")]
        Category_CategoryAlreadyExists,

        /// <summary>
        /// productos
        /// </summary>

        [Description("Producto no encontrado")]
        Product_ProductNotFound,

        [Description("El producto ya existe")]
        Product_ProductAlreadyExists,

        /// <summary>
        /// Business
        /// </summary>

        [Description("Acción desconocida para el elemento")]
        Business_UnknownActionForElement,

        [Description("Acción prohibida para el elemento")]
        Business_ForbiddenActionForElement,

        [Description("Elemento ya existe")]
        Business_ElementAlreadyExists,

        [Description("Elemento no existe")]
        Business_ElementDoesNotExists,

        [Description("Proporcione una imagen")]
        Business_ElementImageMissing,

        /// <summary>
        /// Cart
        /// </summary>
       
        [Description("Actualice su carrito de compras, algunos productos se han actualizado")]
        Cart_UpdateIsRequired,

        [Description("El restaurante está fuera de línea")]
        Cart_OnlineStoreClosed,

        /// <summary>
        /// Order
        /// </summary>
        /// 

        [Description("Orden no encontrada")]
        Order_OrderNotFound,

        [Description("La orden tiene un estatus diferente, actualice para continuar")]
        Order_OrderHasDifferentStatus,

        [Description("La orden ya fue entregada")]
        Order_OrderWasDelivered,

    }
}
