using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Server.Source.Extensions;
using Server.Source.Models.DTOs.User.Access;
using Server.Source.Models.DTOs.User.Administration;
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
        public async Task<ActionResult> Signup([FromBody] UserSignupRequest request)
        {
            var respose = await _userAccessLogic.SignupAsync(request);
            return Ok(respose);
        }

        /// <summary>
        /// Inicio de sesion
        /// </summary>
        [HttpPost(template: "access/login")]
        public async Task<ActionResult> Login([FromBody] UserLoginRequest request)
        {
            var respose = await _userAccessLogic.LoginAsync(request);
            return Ok(respose);
        }

        [HttpGet(template: "access/email-available/{email}")]
        public async Task<ActionResult> IsEmailAvailable(string email)
        {
            var isAvailable = await _userAccessLogic.IsEmailAvailableAsync(email);
            return Ok(isAvailable);
        }
    }
}
