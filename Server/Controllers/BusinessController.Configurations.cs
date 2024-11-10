using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Server.Source.Models.DTOs.UseCases.Configuration;
using Server.Source.Models.DTOs.UseCases.Menu;
using Server.Source.Models.DTOs.UseCases.Product;

namespace Server.Controllers
{
    public partial class BusinessController
    {
        /// <summary>
        /// Configuraciones para informacion
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
        /// Configuraciones para orenes
        /// </summary>
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Authorize(Roles = "user-boss")]
        [HttpGet(template: "configurations/orders")]
        public async Task<ActionResult> GetConfigurationsForOrders()
        {
            var result = await _businessLogicConfiguration.GetConfigurationsForOrdersAsync();
            return Ok(result);
        }

        /// <summary>
        /// Actualizar informacion
        /// </summary>
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Authorize(Roles = "user-boss")]
        [HttpPut(template: "configurations/information")]
        public async Task<ActionResult> UpdateConfigurationsForInformation([FromBody] UpdateInformationConfigurationRequest request)
        {
            await _businessLogicConfiguration.UpdateConfigurationsForInformationAsync(request);
            return Ok();
        }

        /// <summary>
        /// Actualizar orden
        /// </summary>
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Authorize(Roles = "user-boss")]
        [HttpPut(template: "configurations/orders")]
        public async Task<ActionResult> UpdateConfigurationsForOrders([FromBody] UpdateOrderConfigurationRequest request)
        {
            await _businessLogicConfiguration.UpdateConfigurationsForOrderAsync(request);
            return Ok();
        }
    }
}
