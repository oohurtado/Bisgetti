using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Server.Source.Logic;
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
        private readonly UserLogicAccess _userLogicAccess;
        private readonly UserLogicAdministration _userLogicAdministration;
        private readonly UserLogicCommon _userLogicCommon;
        private readonly UserLogicAddress _userLogicAddress;

        public UserController(
            UserLogicAccess userLogicAccess,
            UserLogicAdministration userLogicAdministration,
            UserLogicCommon userLogicCommon,
            UserLogicAddress userLogicAdress
            )
        {
            _userLogicAccess = userLogicAccess;
            _userLogicAdministration = userLogicAdministration;
            _userLogicCommon = userLogicCommon;
            _userLogicAddress = userLogicAdress;
        }

        
    }
}
