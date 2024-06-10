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
    }
}
