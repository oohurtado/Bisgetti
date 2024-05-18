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
        private readonly UserSettingsLogic _userSettingsLogic;

        public UserController(
            UserAccessLogic userAccessLogic,
            UserSettingsLogic userSettingsLogic
            )
        {
            _userAccessLogic = userAccessLogic;
            _userSettingsLogic = userSettingsLogic;
        }        
    }
}
