
using Azure.Core;
using Microsoft.AspNetCore.Identity;
using Server.Source.Data.Interfaces;
using Server.Source.Exceptions;
using Server.Source.Models.DTOs.User.Common;
using Server.Source.Models.Enums;

namespace Server.Source.Logic
{
    public class UserLogicCommon
    {
        private readonly IAspNetRepository _aspNetRepository;

        public UserLogicCommon(IAspNetRepository aspNetRepository)
        {
            _aspNetRepository = aspNetRepository;
        }

        public async Task<UserResponse> GetPersonalDataAsync(string? userId)
        {
            var user = await _aspNetRepository.FindByIdAsync(userId!);
            if (user == null)
            {
                throw new EatSomeInternalErrorException(EnumResponseError.UserNotFound);
            }

            return new UserResponse()
            {
                FirstName = user.FirstName,
                LastName = user.LastName,
                PhoneNumber = user.PhoneNumber,
                Email = user.Email,
            };
        }

        public async Task UpdatePersonalDataAsync(string? userId, UpdatePersonalDataRequest request)
        {
            var user = await _aspNetRepository.FindByIdAsync(userId!);
            if (user == null)
            {
                throw new EatSomeInternalErrorException(EnumResponseError.UserNotFound);
            }

            user.FirstName = request.FirstName;
            user.LastName = request.LastName;
            user.PhoneNumber = request.PhoneNumber;
            await _aspNetRepository.UpdateUserAsync(user);
        }

        public async Task ChangePasswordAsync(string? email, ChangePasswordRequest request)
        {
            var user = await _aspNetRepository.FindByEmailAsync(email!);
            if (user == null)
            {
                throw new EatSomeInternalErrorException(EnumResponseError.UserNotFound);
            }

            var result = await _aspNetRepository.ChangePasswordAsync(user, request.CurrentPassword, request.NewPassword);
            if (!result.Succeeded)
            {
                throw new EatSomeInternalErrorException(EnumResponseError.UserErrorChangingPassword);
            }
        }
    }
}
