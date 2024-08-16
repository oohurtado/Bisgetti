using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Server.Source.Models.DTOs.Business.Category;

namespace Server.Controllers
{
    public partial class BusinessController
    {
        /// <summary>
        /// Listado de categorias - por página
        /// </summary>
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Authorize(Roles = "user-boss")]
        [HttpGet(template: "categories/{sortColumn}/{sortOrder}/{pageSize}/{pageNumber}")]
        public async Task<ActionResult> GetCategoriesByPage(string sortColumn, string sortOrder, int pageSize, int pageNumber, string? term = null)
        {
            var result = await _businessLogicCategory.GetCategoriesByPageAsync(sortColumn, sortOrder, pageSize, pageNumber, term);
            return Ok(result);
        }

        /// <summary>
        /// Listado de categorias - todas
        /// </summary>
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [AllowAnonymous]
        [HttpGet(template: "categories")]
        public async Task<ActionResult> GetCategories()
        {
            var result = await _businessLogicCategory.GetCategoriesAsync();
            return Ok(result);
        }

        /// <summary>
        /// Obtiene categoria
        /// </summary>
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Authorize(Roles = "user-boss")]
        [HttpGet(template: "categories/{id}")]
        public async Task<ActionResult> GetCategory(int id)
        {
            var result = await _businessLogicCategory.GetCategoryAsync(id);
            return Ok(result);
        }

        /// <summary>
        /// Crear categoria
        /// </summary>
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Authorize(Roles = "user-boss")]
        [HttpPost(template: "categories")]
        public async Task<ActionResult> CreateCategory([FromBody] CreateOrUpdateCategoryRequest request)
        {
            await _businessLogicCategory.CreateCategoryAsync(request);
            return Ok();
        }

        /// <summary>
        /// Actualizar categoria
        /// </summary>
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Authorize(Roles = "user-boss")]
        [HttpPut(template: "categories/{id}")]
        public async Task<ActionResult> UpdateCategory([FromBody] CreateOrUpdateCategoryRequest request, int id)
        {
            await _businessLogicCategory.UpdateCategoryAsync(request, id);
            return Ok();
        }

        /// <summary>
        /// Borrar categoria
        /// </summary>
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Authorize(Roles = "user-boss")]
        [HttpDelete(template: "categories/{id}")]
        public async Task<ActionResult> DeleteCategory(int id)
        {
            await _businessLogicCategory.DeleteCategoryAsync(id);
            return Ok();
        }
    }
}
