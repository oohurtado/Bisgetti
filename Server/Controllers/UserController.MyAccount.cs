﻿using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Server.Source.Extensions;
using Server.Source.Models.DTOs.UseCases.MyAccount;
using Server.Source.Models.Enums;
using System.Security.Claims;

namespace Server.Controllers
{
    public partial class UserController
    {
        #region personal data
        /// <summary>
        /// Obtiene datos personales
        /// </summary>
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpGet(template: "my-account/personal-data")]
        public async Task<ActionResult> GetPersonalData(string userId = null!)
        {
            if (userId == null)
            {
                userId = User.FindFirstValue(ClaimTypes.NameIdentifier!)!;
            }
            var result = await _userLogicCommon.GetPersonalDataAsync(userId);
            return Ok(result);
        }

        /// <summary>
        /// Actualiza datos personales
        /// </summary>
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPut(template: "my-account/personal-data")]
        public async Task<ActionResult> UpdatePersonalData([FromBody] UpdatePersonalDataRequest request, string userId = null!)
        {
            if (userId == null)
            {
                userId = User.FindFirstValue(ClaimTypes.NameIdentifier!)!;
            }
            await _userLogicCommon.UpdatePersonalDataAsync(userId, request);
            return Ok();
        }

        /// <summary>
        /// Actualiza contraseña
        /// </summary>
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPut(template: "my-account/password")]
        public async Task<ActionResult> ChangePassword([FromBody] ChangePasswordRequest request)
        {
            var email = User.FindFirstValue(ClaimTypes.Email!);
            await _userLogicCommon.ChangePasswordAsync(email, request);
            return Ok();
        }
        #endregion

        #region addresses
        /// <summary>
        /// Obtiene listado de direcciones
        /// </summary>
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Authorize(Roles = "user-customer")]
        [HttpGet(template: "my-account/addresses")]
        public async Task<ActionResult> GetAddresses()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier!)!;
            var result = await _userLogicAddress.GetAddressesAsync(userId);
            return Ok(result);
        }

        /// <summary>
        /// Obtiene direccion
        /// </summary>
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Authorize(Roles = "user-customer")]
        [HttpGet(template: "my-account/addresses/{id}")]
        public async Task<ActionResult> GetAddress(int id)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier!)!;
            var result = await _userLogicAddress.GetAddressAsync(userId, id);
            return Ok(result);
        }

        /// <summary>
        /// Crear direccion
        /// </summary>
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Authorize(Roles = "user-customer")]
        [HttpPost(template: "my-account/addresses")]
        public async Task<ActionResult> CreateAddress([FromBody] CreateOrUpdateAddressRequest request)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier!)!;
            await _userLogicAddress.CreateAddressAsync(request, userId);
            return Ok();
        }

        /// <summary>
        /// Actualizar direccion
        /// </summary>
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Authorize(Roles = "user-customer")]
        [HttpPut(template: "my-account/addresses/{id}")]
        public async Task<ActionResult> UpdateAddress([FromBody] CreateOrUpdateAddressRequest request, int id)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier!)!;
            await _userLogicAddress.UpdateAddressAsync(request, userId, id);
            return Ok();
        }

        /// <summary>
        /// Borrar direccion
        /// </summary>
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Authorize(Roles = "user-customer")]
        [HttpDelete(template: "my-account/addresses/{id}")]
        public async Task<ActionResult> DeleteAddress(int id)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier!)!;
            await _userLogicAddress.DeleteAddressAsync(userId, id);
            return Ok();
        }

        /// <summary>
        /// Actualizar direccion - predeterminado
        /// </summary>
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Authorize(Roles = "user-customer")]
        [HttpPut(template: "my-account/addresses/default/{id}")]
        public async Task<ActionResult> UpdateAddressDefault([FromBody] UpdateAddressDefaultRequest request, int id)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier!)!;
            await _userLogicAddress.UpdateAddressDefaultAsync(request, userId, id);
            return Ok();
        } 
        #endregion
    }
}
