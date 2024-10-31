using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Server.Source.Extensions;
using Server.Source.Hubs;
using Server.Source.Logic;
using Server.Source.Models.DTOs.UseCases.Cart;
using Server.Source.Models.DTOs.UseCases.Order;
using Server.Source.Models.Enums;
using Server.Source.Models.Hubs;
using System.Security.Claims;

namespace Server.Controllers
{
    public partial class BusinessController
    {
        /// <summary>
        /// Obtiene listado de pedidos - por página
        /// </summary>
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Authorize(Roles = "user-customer,user-boss,user-chef")]
        [HttpGet(template: "orders/{sortColumn}/{sortOrder}/{pageSize}/{pageNumber}/{filter}")]
        public async Task<ActionResult> GetOrdersByPage(string sortColumn, string sortOrder, int pageSize, int pageNumber, string filter)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier!)!;
            var userRole = User.FindFirstValue(ClaimTypes.Role!);
            var result = await _businessLogicOrder.GetOrdersByPageAsync(userId, userRole!, sortColumn, sortOrder, pageSize, pageNumber, filter);
            return Ok(result);
        }

        /// <summary>
        /// Obtiene orden y sus detalles
        /// </summary>
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Authorize(Roles = "user-customer,user-boss,user-chef")]
        [HttpGet(template: "orders/{orderId}")]
        public async Task<ActionResult> GetOrder(int orderId)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier!)!;
            var userRole = User.FindFirstValue(ClaimTypes.Role!);
            var result = await _businessLogicOrder.GetOrderAsync(userId, userRole!, orderId);
            return Ok(result);
        }

        /// <summary>
        /// Cambiar a siguiente paso
        /// </summary>
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Authorize(Roles = "user-boss,user-chef")]
        [HttpPut(template: "orders/{orderId}/next-step")]
        public async Task<ActionResult> OrderNextStep(int orderId, [FromBody] OrderChangeStatusRequest request, [FromServices] IHubContext<MassiveLiveNotificationHub> hub)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier!)!;
            var userRole = User.FindFirstValue(ClaimTypes.Role!)!;
            await _businessLogicOrder.OrderNextStepAsync(userId, userRole, orderId, request);                    

            return Ok();
        }

        /// <summary>
        /// Cambiar a cancelado
        /// </summary>
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Authorize(Roles = "user-boss,user-chef")]
        [HttpPut(template: "orders/{orderId}/canceled")]
        public async Task<ActionResult> OrderCanceled(int orderId, [FromBody] OrderChangeStatusRequest request, [FromServices] IHubContext<MassiveLiveNotificationHub> hub)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier!)!;
            var userRole = User.FindFirstValue(ClaimTypes.Role!)!;
            await _businessLogicOrder.OrderCanceledAsync(userId, userRole, orderId, request);

            return Ok();
        }

        /// <summary>
        /// Cambiar a declinado
        /// </summary>
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Authorize(Roles = "user-boss,user-chef")]
        [HttpPut(template: "orders/{orderId}/declined")]
        public async Task<ActionResult> OrderDeclined(int orderId, [FromBody] OrderChangeStatusRequest request, [FromServices] IHubContext<MassiveLiveNotificationHub> hub)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier!)!;
            var userRole = User.FindFirstValue(ClaimTypes.Role!)!;
            await _businessLogicOrder.OrderDeclinedAsync(userId, userRole, orderId, request);

            return Ok();
        }
    }
}
