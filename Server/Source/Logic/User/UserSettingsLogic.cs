using Server.Source.Data;
using Server.Source.Exceptions;
using Server.Source.Extensions;
using Server.Source.Models.DTOs;
using Server.Source.Models.DTOs.User.Settings.Admin;
using Server.Source.Models.Enums;

namespace Server.Source.Logic.User
{
    public class UserSettingsLogic
    {
        private readonly IAspNetRepository _aspNetRepository;

        public UserSettingsLogic(IAspNetRepository aspNetRepository)
        {
            _aspNetRepository = aspNetRepository;
        }

        public async Task<Response> ChangeUserRoleAsync(EnumRole executingUserRole, UserChangeUserRoleRequest request)
        {
            // buscar user del correo a cambiar su rol
            var user = await _aspNetRepository.FindByEmailAsync(request.Email);
            if (user == null)
            {
                throw new EatSomeException(EnumResponseError.UserNotFound);
            }

            // obtenemos rol del usuaro
            var roleToRemove = await _aspNetRepository.GetUserRoleAsync(user);
            // validamos que podamos hacer el cambio de rol
            ChangeUserRoleValidator(executingUserRole.GetDescription(), roleToRemove, roleToAdd: request.Role);
            // quitamos rol actual y asignamos nuevo rol
            await _aspNetRepository.SetUserRoleAsync(user, roleToRemove: roleToRemove, roleToAdd: request.Role);

            return new Response();
        }

        private void ChangeUserRoleValidator(string executingUserRole, string roleToRemove, string roleToAdd)
        {
            if (executingUserRole == EnumRole.UserAdmin.GetDescription())
            {
                if (roleToRemove == EnumRole.UserAdmin.GetDescription() || roleToAdd == EnumRole.UserAdmin.GetDescription())
                {
                    throw new EatSomeException(EnumResponseError.UserAdminRoleCannotBeChanged);
                }

                return;          
            }

            throw new NotImplementedException();
        }
    }
}