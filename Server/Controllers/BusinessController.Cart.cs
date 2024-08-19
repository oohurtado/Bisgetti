using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Server.Source.Models.DTOs.Business.Cart;
using Server.Source.Models.DTOs.Business.Category;
using Server.Source.Models.DTOs.Business.Product;
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

        // TODO: /cart
        // - CartElement left join Product
        // - obtener carrito agrupado por IsForLater y PersonName

        /// <summary>
        /// Listado de personas
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
