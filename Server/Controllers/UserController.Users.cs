using Azure.Core;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Server.Source.Extensions;
using Server.Source.Models.DTOs.UseCases.User;
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
        [Authorize(Roles = "user-admin,user-boss")]
        [HttpGet(template: "users/{sortColumn}/{sortOrder}/{pageSize}/{pageNumber}")]
        public async Task<ActionResult> GetUsersByPage(string sortColumn, string sortOrder, int pageSize, int pageNumber, string? term = null)
        {            
            var result = await _userLogicUser.GetUsersByPageAsync(sortColumn, sortOrder, pageSize, pageNumber, term);
            return Ok(result);
        }

        /// <summary>
        /// Cambio de rol (admin,boss,customer)
        /// </summary>
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Authorize(Roles = "user-admin,user-boss")]
        [HttpPut(template: "users/role")]
        public async Task<ActionResult> ChangeRole([FromBody] ChangeRoleRequest request)
        {            
            var executingUserRole = User.FindFirstValue(ClaimTypes.Role!);
            var executingUserId = User.FindFirstValue(ClaimTypes.NameIdentifier!);
            await _userLogicUser.ChangeRoleAsync(executingUserId!, executingUserRole!, request);
            return Ok();
        }
    }
}
