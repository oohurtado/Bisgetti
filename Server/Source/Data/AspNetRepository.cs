
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Server.Source.Extensions;
using Server.Source.Models.Enums;

namespace Server.Source.Data
{
    public class AspNetRepository : IAspNetRepository
    {
        private readonly RoleManager<IdentityRole> _roleManager;

        public AspNetRepository(
            RoleManager<IdentityRole> roleManager
            )
        {
            _roleManager = roleManager;
        }

        public async Task CreateRolesAsync(List<string> appRoles)
        {
            var databaseRoles = _roleManager.Roles.ToList();

            var roleNamesToAdd = appRoles.Except(databaseRoles.Select(p => p.Name));
            foreach (var role in roleNamesToAdd)
            {
                await _roleManager.CreateAsync(new IdentityRole(role!));
            }
        }

        /// <summary>
        /// Deletes roles not in use and not in json field "Roles"
        /// </summary>
        public async Task DeleteRolesAsync(List<string> appRoles)
        {
            var databaseRoles = await _roleManager.Roles.ToListAsync();

            var roleNamesToDelete = databaseRoles.Select(p => p.Name).Except(appRoles).ToList();
            var rolesToDelete = databaseRoles.Where(p => roleNamesToDelete.Contains(p.Name)).ToList();
            foreach (var role in rolesToDelete)
            {
                await _roleManager.DeleteAsync(role);
            }
        }
    }
}
