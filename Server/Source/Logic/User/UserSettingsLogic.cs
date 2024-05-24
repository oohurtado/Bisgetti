using Server.Source.Data;
using Server.Source.Exceptions;
using Server.Source.Extensions;
using Server.Source.Models.DTOs;
using Server.Source.Models.DTOs.User.Settings;
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

        public async Task ChangeUserRoleAsync(string executingUserRole, UserChangeUserRoleRequest request)
        {
            // buscar user del correo a cambiar su rol
            var user = await _aspNetRepository.FindByEmailAsync(request.Email);
            if (user == null)
            {
                throw new EatSomeException(EnumResponseError.UserNotFound);
            }

            // obtenemos rol del usuario
            var roleToRemove = await _aspNetRepository.GetUserRoleAsync(user);
       
            // quitamos rol actual y asignamos nuevo rol
            await _aspNetRepository.SetUserRoleAsync(user, roleToRemove: roleToRemove, roleToAdd: request.Role);
        }     
    }
}