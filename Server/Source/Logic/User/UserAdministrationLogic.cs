using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Server.Source.Data.Interfaces;
using Server.Source.Exceptions;
using Server.Source.Extensions;
using Server.Source.Models.DTOs.Common;
using Server.Source.Models.DTOs.User.Administration;
using Server.Source.Models.DTOs.User.Common;
using Server.Source.Models.Enums;
using Server.Source.Utilities;

namespace Server.Source.Logic.User
{
    public class UserAdministrationLogic
    {
        private readonly IAspNetRepository _aspNetRepository;

        public UserAdministrationLogic(
            IAspNetRepository aspNetRepository            
            )
        {
            _aspNetRepository = aspNetRepository;
        }

        public async Task<PageResponse<UserResponse>> GetUserListByPageAsync(string sortColumn, string sortOrder, int pageSize, int pageNumber, string? term)
        {
            var data = await _aspNetRepository.GetUsersByPage(sortColumn, sortOrder, pageSize, pageNumber, term!, out int grandTotal).ToListAsync();         

            var result = new List<UserResponse>();
            foreach (var item in data)
            {
                var roles = await _aspNetRepository.GetRolesFromUserAsync(item);
                result.Add(new UserResponse()
                {
                    Id = item.Id,
                    FirstName = item.FirstName,
                    LastName = item.LastName,
                    Email = item.Email,
                    PhoneNumber = item.PhoneNumber,
                    UserRole = roles.Where(p => p.StartsWith("user-")).FirstOrDefault(),
                });
            }

            return new PageResponse<UserResponse> 
            { 
                GrandTotal = grandTotal,
                Data = result,
            };
        }

        public async Task ChangeUserRoleAsync(string executingUserRole, ChangeRoleRequest request)
        {
            // TODO: validaciones sobre quien ejecuta, a quien se le va a asignar...
            // TODO: enviar correo de cambio de rol

            // buscar user del correo a cambiar su rol
            var user = await _aspNetRepository.FindByEmailAsync(request.Email);
            if (user == null)
            {
                throw new EatSomeInternalErrorException(EnumResponseError.UserNotFound);
            }
            if (user.Id != request.Id)
            {
                throw new EatSomeInternalErrorException(EnumResponseError.InternalServerError);
            }

            // obtenemos rol del usuario
            var roleToRemove = await _aspNetRepository.GetUserRoleAsync(user);

            // quitamos rol actual y asignamos nuevo rol
            await _aspNetRepository.SetUserRoleAsync(user, roleToRemove: roleToRemove, roleToAdd: request.Role);
        }

        public async Task CreateUserAsync(CreateUserRequest request)
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
            var role = request.UserRole;
            await _aspNetRepository.AddRoleToUserAsync(user, role);

            // TODO: enviar correo que se ha creado su usuario
        }
    }
}