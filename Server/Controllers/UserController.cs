using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Server.Source.Logic.User;
using Server.Source.Models.DTOs.User;
using System.Security.Claims;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public partial class UserController : ControllerBase
    {
        private readonly UserAccessLogic _userAccessLogic;

        public UserController(UserAccessLogic userAccessLogic)
        {
            _userAccessLogic = userAccessLogic;
        }

        [HttpPost(template: "access/signup")]
        public async Task<ActionResult<UserTokenResponse>> Signup([FromBody] UserSignupEditorRequest request)
        {
            var respose = await _userAccessLogic.SignupAsync(request);
            return Ok(respose);
        }

        [HttpPost(template: "access/login")]
        public async Task<ActionResult<UserTokenResponse>> Login([FromBody] UserLoginEditorRequest request)
        {
            var respose = await _userAccessLogic.LoginAsync(request);
            return Ok(respose);
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPut(template: "access/change-password")]
        public async Task<ActionResult> ChangePassword([FromBody] UserChangePasswordEditorRequest request)
        {
            var email = User.FindFirstValue(ClaimTypes.Email!);
            var respose = await _userAccessLogic.ChangePasswordAsync(email!, request);
            return Ok(respose);
        }
    }
}
