﻿using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Server.Source.Exceptions;
using Server.Source.Extensions;
using Server.Source.Models.DTOs.UseCases.Access;
using Server.Source.Models.Enums;
using System.Security.Claims;

namespace Server.Controllers
{
    public partial class UserController
    {
        /// <summary>
        /// Registro de usuario
        /// </summary>
        [HttpPost(template: "access/signup")]
        public async Task<ActionResult> Signup([FromBody] SignupRequest request)
        {
            var respose = await _userLogicAccess.SignupAsync(request);
            return Ok(respose);
        }

        /// <summary>
        /// Inicio de sesion
        /// </summary>
        [HttpPost(template: "access/login")]
        public async Task<ActionResult> Login([FromBody] LoginRequest request)
        {            
            var respose = await _userLogicAccess.LoginAsync(request);
            return Ok(respose);
        }

        /// <summary>
        /// Correo disponible
        /// </summary>
        [HttpGet(template: "access/email-available/{email}")]
        public async Task<ActionResult> IsEmailAvailable(string email)
        {
            var isAvailable = await _userLogicAccess.IsEmailAvailableAsync(email);
            return Ok(isAvailable);
        }

        /// <summary>
        /// Recuperar contraseña 1
        /// </summary>
        [HttpPost(template: "access/password-recovery")]
        public async Task<ActionResult> PasswordRecovery([FromBody] PasswordRecoveryRequest request)
        {
            await _userLogicAccess.PasswordRecoveryAsync(request);
            return Ok();
        }

        /// <summary>
        /// Recuperar contraseña 2
        /// </summary>
        [HttpPost(template: "access/password-set")]
        public async Task<ActionResult> PasswordSet([FromBody] PasswordSetRequest request)
        {
            await _userLogicAccess.PasswordSetAsync(request);
            return Ok();
        }
    }
}
