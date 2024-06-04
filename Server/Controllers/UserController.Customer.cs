using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Server.Source.Extensions;
using Server.Source.Models.DTOs.User.Address;
using Server.Source.Models.DTOs.User.Administration;
using Server.Source.Models.DTOs.User.Common;
using Server.Source.Models.Enums;
using System.Security.Claims;

namespace Server.Controllers
{
    public partial class UserController
    {
        /// <summary>
        /// Obtiene listado de direcciones
        /// </summary>
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Authorize(Roles = "user-customer")]
        [HttpGet(template: "addresses/{sortColumn}/{sortOrder}/{pageSize}/{pageNumber}")]
        public async Task<ActionResult> GetAddressesList(string sortColumn, string sortOrder, int pageSize, int pageNumber, string? term = null)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier!)!;
            var result = await _userAddressLogic.GetAddressListByPageAsync(userId, sortColumn, sortOrder, pageSize, pageNumber, term);
            return Ok(result);
        }

        /// <summary>
        /// Obtiene direccion
        /// </summary>
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Authorize(Roles = "user-customer")]
        [HttpGet(template: "addresses/{id}")]
        public async Task<ActionResult> GetAddress(int id)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier!)!;
            var result = await _userAddressLogic.GetAddressAsync(userId, id);
            return Ok(result);
        }

        /// <summary>
        /// Crear direccion
        /// </summary>
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Authorize(Roles = "user-customer")]
        [HttpPost(template: "addresses")]
        public async Task<ActionResult> CreateAddress([FromBody] CreateOrUpdateAddressRequest request)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier!)!;
            await _userAddressLogic.CreateAddressAsync(request, userId);
            return Ok();
        }

        /// <summary>
        /// Actualizar direccion
        /// </summary>
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Authorize(Roles = "user-customer")]
        [HttpPut(template: "addresses/{id}")]
        public async Task<ActionResult> UpdateAddress([FromBody] CreateOrUpdateAddressRequest request, int id)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier!)!;
            await _userAddressLogic.UpdateAddressAsync(request, userId, id);
            return Ok();
        }

        /// <summary>
        /// Borrar direccion
        /// </summary>
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Authorize(Roles = "user-customer")]
        [HttpDelete(template: "addresses/{id}")]
        public async Task<ActionResult> DeleteAddress(int id)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier!)!;
            await _userAddressLogic.DeleteAddressAsync(userId, id);
            return Ok();
        }

        /// <summary>
        /// Actualizar direccion
        /// </summary>
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Authorize(Roles = "user-customer")]
        [HttpPut(template: "addresses/default/{id}")]
        public async Task<ActionResult> UpdateAddressDefault([FromBody] UpdateAddressDefaultRequest request, int id)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier!)!;
            await _userAddressLogic.UpdteAddressDefaultAsync(request, userId, id);
            return Ok();
        }
    }
}
