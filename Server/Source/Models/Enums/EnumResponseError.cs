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
        UserEmailAlreadyExists,

        [Description("Credenciales incorrectas, verifique su correo electrónico o contraseña")]
        UserWrongCredentials,

        [Description("Usuario no encontrado")]
        UserNotFound,

        [Description("Ha sucedido un error al intentar cambiar la contraseña")]
        UserErrorChangingPassword,

        [Description("El usuario no tiene un rol de tipo 'Usuario' asignado")]
        UserWithoutUserRole,

        [Description("Error al actualizar los datos personales")]
        UserErrorUpdaingPersonalData,

        [Description("No se puede realizar el cambo de rol, ya que el actual y el nuevo son en mismo rol")]
        UserOldRoleAndNewRoleAreTheSame,

        /// <summary>
        /// paginacion
        /// </summary>

        [Description("No se encontó la columna de ordenamiento")]
        SortColumnKeyNotFound,

        /// <summary>
        /// direcciones
        /// </summary>

        [Description("Dirección no encontrada")]
        AddressNotFound,

        [Description("La dirección ya existe")]
        AddressAlreadyExists,

        [Description("Has llegado al límite de direcciones que se pueden crear")]
        AddressCreateLimit,

        /// <summary>
        /// menus
        /// </summary>
        
        [Description("Menú no encontrado")]
        MenuNotFound,

        [Description("El menú ya existe")]
        MenuAlreadyExists,

        /// <summary>
        /// categorias
        /// </summary>

        [Description("Categoría no encontrada")]
        CategoryNotFound,

        [Description("La categoría ya existe")]
        CategoryAlreadyExists,

        /// <summary>
        /// productos
        /// </summary>

        [Description("Producto no encontrado")]
        ProductNotFound,

        [Description("El producto ya existe")]
        ProductAlreadyExists,

        /// <summary>
        /// Business
        /// </summary>

        [Description("Error al agregar elemento...")]
        BusinessAddElement,

        [Description("Error al quitar elemento")]
        BusinessRemoveElement,

        [Description("Elemento desconocido")]
        BusinessUnknownElement,

        [Description("Elemento ya existe")]
        BusinessElementAlreadyExists,

        [Description("Elemento no existe")]
        BusinessElementDoesNotExists

    }
}
