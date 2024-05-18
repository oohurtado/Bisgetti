using Microsoft.OpenApi.Extensions;
using Server.Source.Data;
using Server.Source.Exceptions;
using Server.Source.Extensions;
using Server.Source.Models.DTOs;
using Server.Source.Models.DTOs.User.Access;
using Server.Source.Models.Entities;
using Server.Source.Models.Enums;
using Server.Source.Utilities;
using System.Data;

namespace Server.Source.Logic.User
{
    public class UserAccessLogic
    {
        private readonly IAspNetRepository _aspNetRepository;
        private readonly ConfigurationUtility _configurationUtility;

        public UserAccessLogic(
            IAspNetRepository aspNetRepository,
            ConfigurationUtility configurationUtility
            )
        {
            _aspNetRepository = aspNetRepository;
            _configurationUtility = configurationUtility;
        }

        public async Task<Response> SignupAsync(UserSignupRequest request)
        {
            // mandamos error si el usuario ya existe
            var user = await _aspNetRepository.FindByEmailAsync(request.Email);
            if (user != null)
            {
                throw new EatSomeException(EnumResponseError.UserEmailAlreadyExists);
            }

            // construimos usuario con parametros de entrada y registramos usuario en base de datos         
            user = new()
            {
                UserName = request.Email,
                Email = request.Email,
                FirstName = request.FirstName,
                LastName = request.LastName,
            };
            var result = await _aspNetRepository.CreateUserAsync(user, request.Password);

            // si no es posible registrar mandamos error
            if (!result.Succeeded)
            {
                throw new EatSomeException(EnumResponseError.InternalServerError);
            }

            // asignamos role de inicio
            var role = _configurationUtility.GetAdminEmails().Any(p => p == request.Email) ? EnumRole.UserAdmin.GetDescription() : EnumRole.UserClient.GetDescription();
            await _aspNetRepository.AddRoleToUserAsync(user, role);

            // creamos token
            var claims = TokenUtility.CreateClaims(user!, new List<string>() { role });
            var token = TokenUtility.BuildToken(claims, _configurationUtility.GetJWTKey());

            return new Response() { Data = token };
        }

        public async Task<Response> LoginAsync(UserLoginRequest request)
        {
            // iniciamos sesion
            var result = await _aspNetRepository.LoginAsync(request.Email, request.Password);
            if (!result.Succeeded)
            {
                throw new EatSomeException(EnumResponseError.UserWrongCredentials);
            }

            // obtenemos roles del usuario
            var user = await _aspNetRepository.FindByEmailAsync(request.Email);
            var roles = await _aspNetRepository.GetRolesFromUserAsync(user);

            // creamos token
            var claims = TokenUtility.CreateClaims(user!, roles.ToList());
            var token = TokenUtility.BuildToken(claims, _configurationUtility.GetJWTKey());

            return new Response() { Data = token };
        }

        public async Task<Response> ChangePasswordAsync(string email, UserChangePasswordRequest request)
        {
            // obtenemos usuario
            var user = await _aspNetRepository.FindByEmailAsync(email);
            if (user == null)
            {
                throw new EatSomeException(EnumResponseError.UserNotFound);
            }

            // actualizamos contraseña
            var result = await _aspNetRepository.ChangePasswordAsync(user, request.CurrentPassword, request.NewPassword);
            if (!result.Succeeded)
            {
                throw new EatSomeException(EnumResponseError.UserErrorChangingPassword);
            }

            return new Response();
        }
    }
}
