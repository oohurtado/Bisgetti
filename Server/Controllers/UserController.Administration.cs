using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Server.Source.Extensions;
using Server.Source.Models.DTOs.User.Admin;
using Server.Source.Models.Enums;
using System.Security.Claims;

namespace Server.Controllers
{
    public partial class UserController
    {
        /// <summary>
        /// Listado de usuarios
        /// </summary>
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Authorize(Roles = "user-admin")]
        [HttpGet(template: "administration/options/users/{sortColumn}/{sortOrder}/{pageSize}/{pageNumber}")]
        public async Task<ActionResult> UserList(string sortColumn, string sortOrder, int pageSize, int pageNumber)
        {
            string term = string.Empty;
            if (term == "[empty]")
            {
                term = string.Empty;
            }
            var result = await _userAdminLogic.GetUserListByPageAsync(sortColumn, sortOrder, pageSize, pageNumber, term);
            return Ok(result);
        }

        /// <summary>
        /// Cambio de Rol de usuario (admin,boss,client)
        /// </summary>
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Authorize(Roles = "user-admin")]
        [HttpPut(template: "administration/options/users/change-user-role")]
        public async Task<ActionResult> ChangeUserRole([FromBody] ChangeUserRoleRequest request)
        {
            var executingUserRole = User.FindFirstValue(ClaimTypes.Role!);
            await _userAdminLogic.ChangeUserRoleAsync(executingUserRole!, request);
            return Ok();
        }

        // TODO: endpoints para acabar el admin
        // admin/personal-data -> get
        // admin/personal-data -> put
        // admin/personal-data/password
        // admin/options/users/{email}/ban -> get -> obtenemos el status del correo
        // admin/options/users/{email}/ban/{newStatus} -> put -> especificamos nuevo status del correo
    }
}
