
using Azure.Core;
using Microsoft.AspNetCore.Identity;
using Server.Source.Data;
using Server.Source.Exceptions;
using Server.Source.Models.DTOs.User.Common;
using Server.Source.Models.Enums;

namespace Server.Source.Logic.User
{
    public class UserCommonLogic
    {
        private readonly IAspNetRepository _aspNetRepository;

        public UserCommonLogic(IAspNetRepository aspNetRepository) 
        {
            _aspNetRepository = aspNetRepository;
        }

        public async Task<UserUpdatePersonalDataResponse> GetPersonalDataAsync(string? email)
        {
            var user = await _aspNetRepository.FindByEmailAsync(email!);
            if (user == null)
            {
                throw new EatSomeException(EnumResponseError.UserNotFound);
            }

            return new UserUpdatePersonalDataResponse()
            {
                FirstName = user.FirstName,
                LastName = user.LastName,
                PhoneNumber = user.PhoneNumber,
            };
        }

        public async Task UpdatePersonalDataAsync(string? email, UserUpdatePersonalDataRequest request)
        {
            var user = await _aspNetRepository.FindByEmailAsync(email!);
            if (user == null)
            {
                throw new EatSomeException(EnumResponseError.UserNotFound);
            }

            user.FirstName = request.FirstName;
            user.LastName = request.LastName;
            user.PhoneNumber = request.PhoneNumber;
            await _aspNetRepository.UpdateUserAsync(user);
        }

        public async Task ChangePasswordAsync(string? email, UserChangePasswordRequest request)
        {
            var user = await _aspNetRepository.FindByEmailAsync(email!);
            if (user == null)
            {
                throw new EatSomeException(EnumResponseError.UserNotFound);
            }

            await _aspNetRepository.ChangePasswordAsync(user, request.CurrentPassword, request.NewPassword);
        }
    }
}
