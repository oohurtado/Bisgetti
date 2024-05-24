using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Server.Source.Extensions;
using Server.Source.Models.DTOs.User;
using Server.Source.Models.DTOs.User.Settings;
using Server.Source.Models.Enums;
using System.Security.Claims;

namespace Server.Controllers
{
    public partial class UserController
    {
        /// <summary>
        /// Cambio de User rol (admin,boss,client)
        /// </summary>
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Authorize(Roles = "user-admin")]
        [HttpPut(template: "settings/change-user-role")]
        public async Task<ActionResult> ChangeUserRole([FromBody] UserChangeUserRoleRequest request)
        {
            var executingUserRole = User.FindFirstValue(ClaimTypes.Role!);
            await _userSettingsLogic.ChangeUserRoleAsync(executingUserRole!, request);
            return Ok();
        }

        // TODO: endpoint para obtener todos los usuarios
        // obtener usuarios de nivel igual o mayor al usuario que ejecuta el endpoint
        // 1 - obtener role y level de quien ejecuta
        // 2 - obtener todos los usuarios con rol y level
        // 3 - excluir level menor
    }
}
