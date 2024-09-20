using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Server.Source.Logic;
using Server.Source.Models.DTOs.UseCases.Cart;
using System.Security.Claims;

namespace Server.Controllers
{
    public partial class BusinessController
    {
        /// <summary>
        /// Listado de pedidos - para clientes - por página
        /// </summary>
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Authorize(Roles = "user-customer")]
        [HttpGet(template: "orders/customer/{sortColumn}/{sortOrder}/{pageSize}/{pageNumber}")]
        public async Task<ActionResult> GetOrdersForCustomerByPage(string sortColumn, string sortOrder, int pageSize, int pageNumber)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier!)!;
            var result = await _businessLogicOrder.GetOrdersForCustomerByPageAsync(userId, sortColumn, sortOrder, pageSize, pageNumber);
            return Ok(result);
        }

        /// <summary>
        /// Listado de pedidos - para jefe - por página
        /// </summary>
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Authorize(Roles = "user-boss")]
        [HttpGet(template: "orders/boss/{sortColumn}/{sortOrder}/{pageSize}/{pageNumber}")]
        public async Task<ActionResult> GetOrdersForBossByPage(string sortColumn, string sortOrder, int pageSize, int pageNumber)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier!)!;
            var result = await _businessLogicOrder.GetOrdersForBossByPageAsync(userId, sortColumn, sortOrder, pageSize, pageNumber);
            return Ok(result);
        }
    }
}
