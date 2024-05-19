using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Server.Source.Logic.User;
using Server.Source.Models.DTOs.User.Settings.Admin;
using System.Security.Claims;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SystemController : ControllerBase
    {
        [HttpGet(template: "datetime")]
        public async Task<ActionResult> Datetime()
        {
            return Ok(await Task.FromResult(new { DateTime.Now }));
        }  
    }
}
