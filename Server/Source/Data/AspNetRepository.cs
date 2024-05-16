
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Server.Source.Extensions;
using Server.Source.Models.Entities;
using Server.Source.Models.Enums;

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

        public async Task<IdentityResult> ChangePasswordAsync(UserEntity user, string currentPassword, string newPassword)
        {
            return await _userManager.ChangePasswordAsync(user, currentPassword, newPassword);            
        }
    }
}
