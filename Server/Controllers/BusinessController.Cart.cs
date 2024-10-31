using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Server.Source.Extensions;
using Server.Source.Hubs;
using Server.Source.Logic;
using Server.Source.Models.DTOs.UseCases.Cart;
using Server.Source.Models.Enums;
using Server.Source.Models.Hubs;
using System.Security.Claims;

namespace Server.Controllers
{
    public partial class BusinessController
    {
        /// <summary>
        /// Listado de personas
        /// </summary>
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Authorize]
        [HttpGet(template: "cart/user/people")]
        public async Task<ActionResult> GetPeople()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier!)!;
            var result = await _businessLogicCart.GetPeopleAsync(userId);
            return Ok(result);
        }

        /// <summary>
        /// Listado de direcciones
        /// </summary>
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Authorize]
        [HttpGet(template: "cart/user/addresses")]
        public async Task<ActionResult> GetAddresses()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier!)!;
            var result = await _businessLogicCart.GetAddressesAsync(userId);
            return Ok(result);
        }

        /// <summary>
        /// Ovtiene direcciones
        /// </summary>
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Authorize]
        [HttpGet(template: "cart/user/addresses/{id}")]
        public async Task<ActionResult> GetAddress(int id)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier!)!;
            var result = await _businessLogicCart.GetAddressAsync(userId, id);
            return Ok(result);
        }

        // TODO: datos en duro
        /// <summary>
        /// Listado de propinas
        /// </summary>
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Authorize]
        [HttpGet(template: "cart/tips")]
        public async Task<ActionResult> GetTips()
        {
            var tips = new List<int>() { 0, 10, 15, 20 };
            var result = await Task.FromResult(tips);
            return Ok(result);
        }

        // TODO: datos en duro
        /// <summary>
        /// Costo de envio
        /// </summary>
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Authorize]
        [HttpGet(template: "cart/shipping-cost")]
        public async Task<ActionResult> GetShippingCost()
        {            
            var result = await Task.FromResult(new ShippingCostResponse() { Total = 30 });
            return Ok(result);
        }

        /// <summary>
        /// Agregar producto a carrito
        /// </summary>
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Authorize]
        [HttpPost(template: "cart/product")]
        public async Task<ActionResult> AddProductToCart([FromBody] AddProductToCartRequest request)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier!)!;
            await _businessLogicCart.AddProductToCartAsync(userId, request);
            return Ok();
        }

        /// <summary>
        /// Actualizar producto del carrito
        /// </summary>
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Authorize]
        [HttpPut(template: "cart/product")]
        public async Task<ActionResult> UpdateProductFromCart([FromBody] UpdateProductFromCartRequest request)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier!)!;
            await _businessLogicCart.UpdateProductFromCartAsync(userId, request);
            return Ok();
        }

        /// <summary>
        /// Listado de productos en el carrito
        /// </summary>
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Authorize]
        [HttpGet(template: "cart/product")]
        public async Task<ActionResult> GetProductsFromCart()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier!)!;
            var result = await _businessLogicCart.GetProductsFromCartAsync(userId);
            return Ok(result);
        }

        /// <summary>
        /// Borra producto del carrito
        /// </summary>
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Authorize]
        [HttpDelete(template: "cart/product/{id}")]
        public async Task<ActionResult> DeleteProductFromCart(int id)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier!)!;
            await _businessLogicCart.DeleteProductFromCartAsync(userId, id);
            return Ok();
        }

        /// <summary>
        /// Numero de productos en el carrito
        /// </summary>
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Authorize]
        [HttpGet(template: "cart/product/number-of-products-in-cart")]
        public async Task<ActionResult> GetNumberOfProductsInCart()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier!)!;
            var result = await _businessLogicCart.GetNumberOfProductsInCartAsync(userId);
            return Ok(result);
        }

        /// <summary>
        /// Numero de productos en el carrito
        /// </summary>
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Authorize]
        [HttpGet(template: "cart/product/total-of-products-in-cart")]
        public async Task<ActionResult> GetTotalOfProductsInCart()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier!)!;
            var result = await _businessLogicCart.GetTotalOfProductsInCartAsync(userId);
            return Ok(result);
        }

        /// <summary>
        /// crea request para el cliente
        /// </summary>
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Authorize]
        [HttpPost(template: "cart/customer/order")]
        public async Task<ActionResult> CreateOrderForCustomer([FromBody] CreateOrderForCustomerRequest request, [FromServices] IHubContext<MassiveLiveNotificationHub> hub)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier!)!;
            var userRole = User.FindFirstValue(ClaimTypes.Role!)!;
            var orderId = await _businessLogicCart.CreateOrderForCustomerAsync(userId, userRole, request);

            return Ok(orderId);
        }
    }
}
