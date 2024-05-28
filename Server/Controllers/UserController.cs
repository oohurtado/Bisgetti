using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Server.Source.Logic.User;
using Server.Source.Models.DTOs.User;
using Server.Source.Models.DTOs.User.Access;
using Server.Source.Models.DTOs.User.Admin;
using System.Security.Claims;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public partial class UserController : ControllerBase
    {
        private readonly UserAccessLogic _userAccessLogic;
        private readonly UserAdminLogic _userAdminLogic;
        private readonly UserCommonLogic _userCommonLogic;

        public UserController(
            UserAccessLogic userAccessLogic,
            UserAdminLogic userAdminLogic,
            UserCommonLogic userCommonLogic
            )
        {
            _userAccessLogic = userAccessLogic;
            _userAdminLogic = userAdminLogic;
            _userCommonLogic = userCommonLogic;
        }

        
    }
}
