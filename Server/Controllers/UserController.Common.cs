using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Server.Source.Extensions;
using Server.Source.Models.DTOs.User.Administration;
using Server.Source.Models.DTOs.User.Common;
using Server.Source.Models.Enums;
using System.Security.Claims;

namespace Server.Controllers
{
    public partial class UserController
    {
        /// <summary>
        /// Obtiene datos personales
        /// </summary>
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]        
        [HttpGet(template: "common/personal-data")]
        public async Task<ActionResult> GetPersonalData()
        {
            var email = User.FindFirstValue(ClaimTypes.Email!);
            var result = await _userCommonLogic.GetPersonalDataAsync(email);
            return Ok(result);
        }

        /// <summary>
        /// Actualiza datos personales
        /// </summary>
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPut(template: "common/personal-data")]
        public async Task<ActionResult> UpdatePersonalData([FromBody] UserUpdatePersonalDataRequest request)
        {
            var email = User.FindFirstValue(ClaimTypes.Email!);
            await _userCommonLogic.UpdatePersonalDataAsync(email, request);
            return Ok();
        }

        /// <summary>
        /// Actualiza contraseña
        /// </summary>
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPut(template: "common/personal-data/password")]
        public async Task<ActionResult> ChangePassword([FromBody] UserChangePasswordRequest request)
        {
            var email = User.FindFirstValue(ClaimTypes.Email!);
            await _userCommonLogic.ChangePasswordAsync(email, request);
            return Ok();
        }
    }
}
