using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Server.Source.Models.DTOs.UseCases.Product;

namespace Server.Controllers
{
    public partial class BusinessController
    {
        /// <summary>
        /// Listado de configuraciones para informacion
        /// </summary>
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Authorize(Roles = "user-boss")]
        [HttpGet(template: "configurations/information")]
        public async Task<ActionResult> GetConfigurationsForInformation()
        {
            var result = await _businessLogicConfiguration.GetConfigurationsForInformationAsync();
            return Ok(result);
        }

        /// <summary>
        /// Listado de configuraciones para orenes
        /// </summary>
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Authorize(Roles = "user-boss")]
        [HttpGet(template: "configurations/orders")]
        public async Task<ActionResult> GetConfigurationsForOrders()
        {
            var result = await _businessLogicConfiguration.GetConfigurationsForOrdersAsync();
            return Ok(result);
        }
    }
}
