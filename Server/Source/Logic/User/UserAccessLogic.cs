using Microsoft.AspNetCore.Mvc;
using Microsoft.OpenApi.Extensions;
using Server.Source.Data.Interfaces;
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

        public async Task<TokenResponse> SignupAsync(SignupRequest request)
        {
            // mandamos error si el usuario ya existe
            var user = await _aspNetRepository.FindByEmailAsync(request.Email);
            if (user != null)
            {
                throw new EatSomeInternalErrorException(EnumResponseError.UserEmailAlreadyExists);
            }

            // construimos usuario con parametros de entrada y registramos usuario en base de datos         
            user = new()
            {
                UserName = request.Email,
                Email = request.Email,
                FirstName = request.FirstName,
                LastName = request.LastName,
                PhoneNumber = request.PhoneNumber,
            };
            var result = await _aspNetRepository.CreateUserAsync(user, request.Password);

            // si no es posible registrar mandamos error
            if (!result.Succeeded)
            {
                throw new EatSomeInternalErrorException(EnumResponseError.InternalServerError);
            }

            // asignamos role de inicio
            var role = _configurationUtility.GetAdminEmails().Any(p => p == request.Email) ? EnumRole.UserAdmin.GetDescription() : EnumRole.UserCustomer.GetDescription();
            await _aspNetRepository.AddRoleToUserAsync(user, role);

            // creamos token
            var claims = TokenUtility.CreateClaims(user!, new List<string>() { role });
            var token = TokenUtility.BuildToken(claims, _configurationUtility.GetJWTKey());

            // TODO: enviar correo que se ha creado su usuario

            return token;
        }

        public async Task<TokenResponse> LoginAsync(LoginRequest request)
        {
            // iniciamos sesion
            var result = await _aspNetRepository.LoginAsync(request.Email, request.Password);
            if (!result.Succeeded)
            {
                throw new EatSomeInternalErrorException(EnumResponseError.UserWrongCredentials);
            }

            // obtenemos roles del usuario
            var user = await _aspNetRepository.FindByEmailAsync(request.Email);
            var roles = await _aspNetRepository.GetRolesFromUserAsync(user);

            // creamos token
            var claims = TokenUtility.CreateClaims(user!, roles.ToList());
            var token = TokenUtility.BuildToken(claims, _configurationUtility.GetJWTKey());

            return token;
        }

        public async Task<bool> IsEmailAvailableAsync(string email)
        {
            var user = await _aspNetRepository.FindByEmailAsync(email);
            return user == null;
        }
    }
}
