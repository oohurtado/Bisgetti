using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Server.Source.Extensions;
using Server.Source.Models.DTOs.User.Admin;
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
            // TODO: common/personal-data -> get            
            return Ok();
        }

        /// <summary>
        /// Actualiza datos personales
        /// </summary>
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPut(template: "common/personal-data")]
        public async Task<ActionResult> UpdatePersonalData([FromBody] UserPersonalDataRequest request)
        {
            // TODO: common/personal-data -> put            
            return Ok();
        }

        /// <summary>
        /// Actualiza contraseña
        /// </summary>
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPut(template: "common/personal-data/password")]
        public async Task<ActionResult> UpdatePassword([FromBody] UserPasswordRequest request)
        {
            // TODO: common/personal-data/password
            return Ok();
        }
    }
}
