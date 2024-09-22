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
        /// Obtiene listado de pedidos - por página
        /// </summary>
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Authorize(Roles = "user-customer,user-boss")]
        [HttpGet(template: "orders/{sortColumn}/{sortOrder}/{pageSize}/{pageNumber}")]
        public async Task<ActionResult> GetOrdersByPage(string sortColumn, string sortOrder, int pageSize, int pageNumber)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier!)!;
            var userRole = User.FindFirstValue(ClaimTypes.Role!);
            var result = await _businessLogicOrder.GetOrdersByPageAsync(userId, userRole!, sortColumn, sortOrder, pageSize, pageNumber);
            return Ok(result);
        }

        /// <summary>
        /// Obtiene orden y sus detalles
        /// </summary>
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Authorize(Roles = "user-customer,user-boss")]
        [HttpGet(template: "orders/{orderId}")]
        public async Task<ActionResult> GetOrder(int orderId)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier!)!;
            var userRole = User.FindFirstValue(ClaimTypes.Role!);
            var result = await _businessLogicOrder.GetOrderAsync(userId, userRole!, orderId);
            return Ok(result);
        }

    }
}
