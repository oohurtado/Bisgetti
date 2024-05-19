using Microsoft.AspNetCore.Mvc;

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
