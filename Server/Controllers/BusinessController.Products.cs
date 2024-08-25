using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Server.Source.Models.DTOs.Product;

namespace Server.Controllers
{
    public partial class BusinessController
    {
        /// <summary>
        /// Listado de productos - por página
        /// </summary>
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Authorize(Roles = "user-boss")]
        [HttpGet(template: "products/{sortColumn}/{sortOrder}/{pageSize}/{pageNumber}")]
        public async Task<ActionResult> GetProductsByPage(string sortColumn, string sortOrder, int pageSize, int pageNumber, string? term = null)
        {
            var result = await _businessLogicProduct.GetProductsByPageAsync(sortColumn, sortOrder, pageSize, pageNumber, term);
            return Ok(result);
        }

        /// <summary>
        /// Listado de productos - tod*s
        /// </summary>
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [AllowAnonymous]
        [HttpGet(template: "products")]
        public async Task<ActionResult> GetProducts()
        {
            var result = await _businessLogicProduct.GetProductsAsync();
            return Ok(result);
        }

        /// <summary>
        /// Obtiene producto
        /// </summary>
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Authorize(Roles = "user-boss")]
        [HttpGet(template: "products/{id}")]
        public async Task<ActionResult> GetProduct(int id)
        {
            var result = await _businessLogicProduct.GetProductAsync(id);
            return Ok(result);
        }

        /// <summary>
        /// Crear producto
        /// </summary>
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Authorize(Roles = "user-boss")]
        [HttpPost(template: "products")]
        public async Task<ActionResult> CreateProduct([FromBody] CreateOrUpdateProductRequest request)
        {
            await _businessLogicProduct.CreateProductAsync(request);
            return Ok();
        }

        /// <summary>
        /// Actualizar producto
        /// </summary>
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Authorize(Roles = "user-boss")]
        [HttpPut(template: "products/{id}")]
        public async Task<ActionResult> UpdateProduct([FromBody] CreateOrUpdateProductRequest request, int id)
        {
            await _businessLogicProduct.UpdateProductAsync(request, id);
            return Ok();
        }

        /// <summary>
        /// Borrar producto
        /// </summary>
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Authorize(Roles = "user-boss")]
        [HttpDelete(template: "products/{id}")]
        public async Task<ActionResult> DeleteProduct(int id)
        {
            await _businessLogicProduct.DeleteProductAsync(id);
            return Ok();
        }
    }
}
