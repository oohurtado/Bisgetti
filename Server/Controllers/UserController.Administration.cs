using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Server.Source.Extensions;
using Server.Source.Models.DTOs.User.Administration;
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
        [HttpGet(template: "administration/users/{sortColumn}/{sortOrder}/{pageSize}/{pageNumber}")]
        public async Task<ActionResult> GetUsersList(string sortColumn, string sortOrder, int pageSize, int pageNumber, string? term = null)
        {
            var result = await _userAdministrationLogic.GetUsersByPageAsync(sortColumn, sortOrder, pageSize, pageNumber, term);
            return Ok(result);
        }

        /// <summary>
        /// Cambio de rol (admin,boss,customer)
        /// </summary>
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Authorize(Roles = "user-admin")]
        [HttpPut(template: "administration/users/role")]
        public async Task<ActionResult> ChangeRole([FromBody] ChangeRoleRequest request)
        {
            var executingUserRole = User.FindFirstValue(ClaimTypes.Role!);
            await _userAdministrationLogic.ChangeUserRoleAsync(executingUserRole!, request);
            return Ok();
        }

        /// <summary>
        /// Crear usuario
        /// </summary>
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Authorize(Roles = "user-admin")]
        [HttpPost(template: "administration/users")]
        public async Task<ActionResult> CreateUser([FromBody] CreateUserRequest request)
        {
            await _userAdministrationLogic.CreateUserAsync(request);
            return Ok();
        }
    }
}
