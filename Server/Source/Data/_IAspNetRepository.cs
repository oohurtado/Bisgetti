using Microsoft.AspNetCore.Identity;
using Server.Source.Models.DTOs.User;
using Server.Source.Models.Entities;

namespace Server.Source.Data
{
    public interface IAspNetRepository
    {
        /// <summary>
        /// Crea roles en el sistema a partir de EnumRole
        /// </summary>
        Task CreateSystemRolesAsync(List<string> appRoles);

        /// <summary>
        /// Borra roles del sistema a partir de EnumRole
        /// </summary>
        Task DeleteSystemRolesAsync(List<string> appRoles);

        /// <summary>
        /// Busca UserEntity por correo electronico
        /// </summary>
        Task<UserEntity?> FindByEmailAsync(string email);

        /// <summary>
        /// Crea usuario
        /// </summary>
        Task<IdentityResult> CreateUserAsync(UserEntity user, string password);

        /// <summary>
        /// Inicio de sesion
        /// </summary>
        Task<SignInResult> LoginAsync(string email, string password);

        /// <summary>
        /// Agrega role a usuario
        /// </summary>
        Task AddRoleToUserAsync(UserEntity user, string role);

        /// <summary>
        /// Obtiene roles de usuario
        /// </summary>
        Task<IList<string>> GetRolesFromUserAsync(UserEntity? user);

        /// <summary>
        /// Cambio de contraseña
        /// </summary>
        Task<IdentityResult> ChangePasswordAsync(UserEntity user, string currentPassword, string newPassword);
    }
}
