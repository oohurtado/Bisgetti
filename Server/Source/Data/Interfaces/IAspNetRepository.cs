using Microsoft.AspNetCore.Identity;
using Server.Source.Models.Entities;

namespace Server.Source.Data.Interfaces
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
        /// Busca UserEntity por correo electronico
        /// </summary>
        Task<UserEntity?> FindByIdAsync(string id);

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

        /// <summary>
        /// Obtiene Usuarios y sus roles
        /// </summary>
        IQueryable<UserEntity> GetUsersByPage(string sortColumn, string sortOrder, int pageSize, int pageNumber, string term, out int grandTotal);

        /// <summary>
        /// Obtiene roles del usuario
        /// </summary>
        Task<string> GetUserRoleAsync(UserEntity user);

        /// <summary>
        /// Asigna nuevo user rol
        /// </summary>
        Task SetUserRoleAsync(UserEntity user, string roleToRemove, string roleToAdd);

        /// <summary>
        /// Actualiza datos personales del usuario
        /// </summary>
        Task UpdateUserAsync(UserEntity user);

        /// <summary>
        /// Genera token para resetear password
        /// </summary>
        Task<string> GeneratePasswordResetTokenAsync(UserEntity user);

        /// <summary>
        /// Resetea password
        /// </summary>
        Task<IdentityResult> ResetPasswordAsync(UserEntity user, string token, string newPassword);
    }
}
