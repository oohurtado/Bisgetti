using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Server.Source.Logic.User;
using Server.Source.Models.DTOs.User;
using Server.Source.Models.DTOs.User.Access;
using Server.Source.Models.DTOs.User.Administration;
using System.Security.Claims;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public partial class UserController : ControllerBase
    {
        private readonly UserAccessLogic _userAccessLogic;
        private readonly UserAdministrationLogic _userAdministrationLogic;
        private readonly UserCommonLogic _userCommonLogic;
        private readonly UserAddressLogic _userAddressLogic;

        public UserController(
            UserAccessLogic userAccessLogic,
            UserAdministrationLogic userAdministrationLogic,
            UserCommonLogic userCommonLogic,
            UserAddressLogic userAddressLogic
            )
        {
            _userAccessLogic = userAccessLogic;
            _userAdministrationLogic = userAdministrationLogic;
            _userCommonLogic = userCommonLogic;
            _userAddressLogic = userAddressLogic;
        }

        
    }
}
