using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Server.Source.Logic;
using Server.Source.Models.DTOs.Cart;
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
        [HttpGet(template: "user/people")]
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

        [HttpGet(template: "user/addresses")]
        public async Task<ActionResult> GetAddresses()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier!)!;
            var result = await _businessLogicCart.GetAddressesAsync(userId);
            return Ok(result);
        }

        /// <summary>
        /// Agregar producto a carrito
        /// </summary>
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Authorize]
        [HttpPost(template: "cart")]
        public async Task<ActionResult> AddProductToCart([FromBody] AddProductToCartRequest request)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier!)!;
            await _businessLogicCart.AddProductToCartAsync(userId, request);
            return Ok();
        }

        /// <summary>
        /// Actuualizar producto del carrito
        /// </summary>
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Authorize]
        [HttpPut(template: "cart")]
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
        [HttpGet(template: "cart")]
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
        [HttpDelete(template: "cart/{id}")]
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
        [HttpGet(template: "cart/number-of-products-in-cart")]
        public async Task<ActionResult> GetNumberOfProductsInCart()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier!)!;
            var result = await _businessLogicCart.GetNumberOfProductsInCartAsync(userId);
            return Ok(result);
        }
    }
}
