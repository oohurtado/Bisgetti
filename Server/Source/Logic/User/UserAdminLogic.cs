using Microsoft.EntityFrameworkCore;
using Server.Source.Data;
using Server.Source.Exceptions;
using Server.Source.Models.DTOs.Common;
using Server.Source.Models.DTOs.User.Admin;
using Server.Source.Models.DTOs.User.Common;
using Server.Source.Models.Enums;

namespace Server.Source.Logic.User
{
    public class UserAdminLogic
    {
        private readonly IAspNetRepository _aspNetRepository;

        public UserAdminLogic(IAspNetRepository aspNetRepository)
        {
            _aspNetRepository = aspNetRepository;
        }

        public async Task<PageResponse<UserResponse>> GetUserListByPageAsync(string sortColumn, string sortOrder, int pageSize, int pageNumber, string? term)
        {
            var users = await _aspNetRepository.GetUsersByPage(sortColumn, sortOrder, pageSize, pageNumber, term, out int grandTotal).ToListAsync();         

            var userList = new List<UserResponse>();
            foreach (var user in users)
            {
                var roles = await _aspNetRepository.GetRolesFromUserAsync(user);
                userList.Add(new UserResponse()
                {
                    Id = user.Id,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    Email = user.Email,
                    PhoneNumber = user.PhoneNumber,
                    UserRole = roles.Where(p => p.StartsWith("user-")).FirstOrDefault(),
                });
            }

            return new PageResponse<UserResponse> 
            { 
                GrandTotal = grandTotal,
                Data = userList,
            };
        }

        public async Task ChangeUserRoleAsync(string executingUserRole, ChangeUserRoleRequest request)
        {
            // TODO: validaciones sobre quien ejecuta, a quien se le va a asignar...

            // buscar user del correo a cambiar su rol
            var user = await _aspNetRepository.FindByEmailAsync(request.Email);
            if (user == null)
            {
                throw new EatSomeException(EnumResponseError.UserNotFound);
            }

            // obtenemos rol del usuario
            var roleToRemove = await _aspNetRepository.GetUserRoleAsync(user);

            // quitamos rol actual y asignamos nuevo rol
            await _aspNetRepository.SetUserRoleAsync(user, roleToRemove: roleToRemove, roleToAdd: request.UserRole);
        }
    }
}