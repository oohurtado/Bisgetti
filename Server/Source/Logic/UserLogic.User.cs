using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Server.Source.Data.Interfaces;
using Server.Source.Exceptions;
using Server.Source.Extensions;
using Server.Source.Models.DTOs.Common;
using Server.Source.Models.DTOs.Entities;
using Server.Source.Models.DTOs.UseCases.User;
using Server.Source.Models.Entities;
using Server.Source.Models.Enums;
using Server.Source.Services.Interfaces;
using Server.Source.Utilities;
using static Server.Source.Services.EmailNotificationService;

namespace Server.Source.Logic
{
    public class UserLogicUser
    {
        private readonly IAspNetRepository _aspNetRepository;
        private readonly INotificationService _notificationService;
        private readonly ConfigurationUtility _configurationUtility;

        public UserLogicUser(
            IAspNetRepository aspNetRepository,
            INotificationService notificationService,
            ConfigurationUtility configurationUtility
            )
        {
            _aspNetRepository = aspNetRepository;
            _notificationService = notificationService;
            _configurationUtility = configurationUtility;
        }

        public async Task<PageResponse<UserResponse>> GetUsersByPageAsync(string sortColumn, string sortOrder, int pageSize, int pageNumber, string? term)
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

        public async Task ChangeRoleAsync(string executingUserRole, ChangeRoleRequest request)
        {
            // TODO: oohg - validaciones sobre quien ejecuta, a quien se le va a asignar...            

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

            if (string.IsNullOrEmpty(roleToRemove))
            {
                throw new EatSomeInternalErrorException(EnumResponseError.UserWithoutUserRole);
            }

            if (roleToRemove == request.Role)
            {
                throw new EatSomeInternalErrorException(EnumResponseError.UserOldRoleAndNewRoleAreTheSame);
            }

            // quitamos rol actual y asignamos nuevo rol
            await _aspNetRepository.SetUserRoleAsync(user, roleToRemove: roleToRemove, roleToAdd: request.Role);

            // enviamos correo indicando cambio de role
            await SendChangeRoleEmailAsync(user, request);
        }

        private async Task SendChangeRoleEmailAsync(UserEntity user, ChangeRoleRequest request)
        {
            var body = EmailUtility.LoadFile(EnumEmailTemplate.ChangeRole);
            var configuration = _configurationUtility.GetRestaurantInformation();
            body = body.Replace("[user-first-name]", user.FirstName);
            body = body.Replace("[restaurant-name]", configuration.Name);
            body = body.Replace("[url]", request.Url);
            body = body.Replace("[role]", request.Role);

            _notificationService.SetMessage($"Cambio de rol", body);
            _notificationService.SetRecipient(email: request.Email, name: user.FirstName!, RecipientType.Recipient);
            await _notificationService.SendEmailAsync();
        }
    }
}