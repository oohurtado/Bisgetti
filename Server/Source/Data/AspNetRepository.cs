
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Server.Source.Data.Interfaces;
using Server.Source.Exceptions;
using Server.Source.Extensions;
using Server.Source.Models.Entities;
using Server.Source.Models.Enums;
using System.Linq.Expressions;

namespace Server.Source.Data
{
    public class AspNetRepository : IAspNetRepository
    {
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly UserManager<UserEntity> _userManager;
        private readonly SignInManager<UserEntity> _signInManager;

        public AspNetRepository(
            RoleManager<IdentityRole> roleManager,
            UserManager<UserEntity> userManager,
            SignInManager<UserEntity> signInManager
            )
        {
            _roleManager = roleManager;
            _userManager = userManager;
            _signInManager = signInManager;            
        }

        public async Task CreateSystemRolesAsync(List<string> appRoles)
        {
            var databaseRoles = _roleManager.Roles.ToList();

            var roleNamesToAdd = appRoles.Except(databaseRoles.Select(p => p.Name));
            foreach (var role in roleNamesToAdd)
            {
                await _roleManager.CreateAsync(new IdentityRole(role!));
            }
        }
        
        public async Task<IdentityResult> CreateUserAsync(UserEntity user, string password)
        {            
            return await _userManager.CreateAsync(user, password);
        }

        public async Task<UserEntity?> FindByEmailAsync(string email)
        {
            return await _userManager.FindByEmailAsync(email);
        }

        public async Task<UserEntity?> FindByIdAsync(string id)
        {
            return await _userManager.FindByIdAsync(id);
        }

        public async Task DeleteSystemRolesAsync(List<string> appRoles)
        {
            var databaseRoles = await _roleManager.Roles.ToListAsync();

            var roleNamesToDelete = databaseRoles.Select(p => p.Name).Except(appRoles).ToList();
            var rolesToDelete = databaseRoles.Where(p => roleNamesToDelete.Contains(p.Name)).ToList();
            foreach (var role in rolesToDelete)
            {
                await _roleManager.DeleteAsync(role);
            }
        }

        public async Task AddRoleToUserAsync(UserEntity user, string role)
        {
            await _userManager.AddToRoleAsync(user, role);            
        }

        public async Task<SignInResult> LoginAsync(string email, string password)
        {
            return await _signInManager.PasswordSignInAsync(email, password, isPersistent: false, lockoutOnFailure: false);
        }

        public async Task<IList<string>> GetRolesFromUserAsync(UserEntity? user)
        {
            return await _userManager.GetRolesAsync(user!);
        }

        public async Task ChangePasswordAsync(UserEntity user, string currentPassword, string newPassword)
        {
            var result = await _userManager.ChangePasswordAsync(user, currentPassword, newPassword);

            if (!result.Succeeded)
            {
                throw new EatSomeInternalErrorException(EnumResponseError.UserErrorChangingPassword);
            }

        }

        public IQueryable<UserEntity> GetUsersByPage(string sortColumn, string sortOrder, int pageSize, int pageNumber, string? term, out int grandTotal)
        {
            IQueryable<UserEntity> iq;
            IOrderedQueryable<UserEntity> ioq = null!;

            // busqueda
            Expression<Func<UserEntity, bool>> expSearch = p => true;
            if (!string.IsNullOrEmpty(term))
            {
                expSearch = p =>
                    p.FirstName!.Contains(term) ||
                    p.LastName!.Contains(term) ||
                    p.Email!.Contains(term);
            }
            iq = _userManager.Users.Where(expSearch);
            
            // conteo
            grandTotal = iq.Count();

            // ordenamiento
            if (sortColumn == "first-name")
            {
                if (sortOrder == "asc")
                {
                    ioq = iq.OrderBy(p => p.FirstName);
                }
                else if (sortOrder == "desc")
                {
                    ioq = iq.OrderByDescending(p => p.FirstName);
                }
            }
            else if (sortColumn == "last-name")
            {
                if (sortOrder == "asc")
                {
                    ioq = iq.OrderBy(p => p.LastName);
                }
                else if (sortOrder == "desc")
                {
                    ioq = iq.OrderByDescending(p => p.LastName);
                }
            }
            else if (sortColumn == "email")
            {
                if (sortOrder == "asc")
                {
                    ioq = iq.OrderBy(p => p.Email);
                }
                else if (sortOrder == "desc")
                {
                    ioq = iq.OrderByDescending(p => p.Email);
                }
            }
            else
            {
                throw new EatSomeInternalErrorException(EnumResponseError.SortColumnKeyNotFound);
            }

            // paginacion
            iq = ioq!
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize);

            return iq.AsNoTracking();
        }

        public async Task<string> GetUserRoleAsync(UserEntity user)
        {
            // obtenemos roles del usuario
            var roles = await _userManager.GetRolesAsync(user);

            // buscamos rol que empiece con user-
            var currentUserRole = roles.Where(p => p.StartsWith("user-")).FirstOrDefault();

            if (string.IsNullOrEmpty(currentUserRole))
            {
                throw new EatSomeInternalErrorException(EnumResponseError.UserWithoutUserRole);
            }

            return currentUserRole!;
        }

        public async Task SetUserRoleAsync(UserEntity user, string roleToRemove, string roleToAdd)
        {
            await _userManager.RemoveFromRoleAsync(user, roleToRemove);
            await _userManager.AddToRoleAsync(user, roleToAdd);
        }

        public async Task UpdateUserAsync(UserEntity user)
        {
            var result = await _userManager.UpdateAsync(user);            

            if (!result.Succeeded)
            {
                throw new EatSomeInternalErrorException(EnumResponseError.UserErrorUpdaingPersonalData);
            }
        }
    }
}
