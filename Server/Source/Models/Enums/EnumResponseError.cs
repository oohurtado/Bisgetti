using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace Server.Source.Models.Enums
{
    public enum EnumResponseError
    {
        [Description("Error interno del servidor. Vuelva a intentarlo más tarde.")]
        InternalServerError,

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

        [Description("A un usuario tipo 'Admistrador' no se le puede cambiar el tipo de rol")]
        UserAdminRoleCannotBeChanged,
    }
}
