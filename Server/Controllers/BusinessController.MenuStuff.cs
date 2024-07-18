using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Server.Source.Models.DTOs.Business.Category;
using Server.Source.Models.DTOs.Business.MenuStuff;

namespace Server.Controllers
{
    public partial class BusinessController
    {
        /// <summary>
        /// Cosas del menu
        /// </summary>
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Authorize(Roles = "user-boss")]
        [HttpGet(template: "menu-stuff/{menuId}")]
        public async Task<ActionResult> GetMenuStuff(int menuId)
        {
            var result = await _businessLogicMenuStuff.GetMenuStuffAsync(menuId);
            return Ok(result);
        }

        /// <summary>
        /// Agregar/Quitar elemento del menu
        /// </summary>
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Authorize(Roles = "user-boss")]
        [HttpPut(template: "menu-stuff/element")]
        public async Task<ActionResult> AddOrRemoveElement([FromBody] AddOrRemoveElementRequest request)
        {
            await _businessLogicMenuStuff.AddOrRemoveElementAsync(request);
            return Ok();
        }

        /// <summary>
        /// Mover elemento en el menu
        /// </summary>
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Authorize(Roles = "user-boss")]
        [HttpPut(template: "menu-stuff/element/position")]
        public async Task<ActionResult> UpdateElementPosition([FromBody] PositionElementRequest request)
        {
            await _businessLogicMenuStuff.UpdateElementPositionAsync(request);
            return Ok();
        }

        /// <summary>
        /// Actualizar elemento en el menu
        /// </summary>
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Authorize(Roles = "user-boss")]
        [HttpPut(template: "menu-stuff/element/visibility")]
        public async Task<ActionResult> UpdateElementVisibility([FromBody] VisibilityElementRequest request)
        {
            await _businessLogicMenuStuff.UpdateElementVisibilityAsync(request);
            return Ok();
        }

        /// <summary>
        /// Crear o Cambiar imagen del elemento
        /// </summary>
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Authorize(Roles = "user-boss")]
        [HttpPut(template: "menu-stuff/element/image")]
        public async Task<ActionResult> UpdateElementImage([FromForm] ImageElementRequest request)
        {
            await _businessLogicMenuStuff.UpdateElementImageAsync(request);
            return Ok();
        }

        /// <summary>
        /// Borra imagen del elemento
        /// </summary>
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Authorize(Roles = "user-boss")]
        [HttpDelete(template: "menu-stuff/element/image")]
        public async Task<ActionResult> DeleteElementImage([FromBody] ImageElementRequest request)
        {
            await _businessLogicMenuStuff.DeleteElementImageAsync(request);
            return Ok();
        }

        // TODO: oohg menu stuff

        /*        
            get menu stuff                      business/menu-stuff/{menuId}                tested
            get categories                      business/categories                         tested
            get products                        business/products                           tested
            put add or remove element           business/menu-stuff/element                 tested
            put position element                business/menu-stuff/element/move            tested
            put visibility element              business/menu-stuff/element/move            tested                  
            put image element                   business/menu-stuff/element/image           tested
            delete image element                business/menu-stuff/element/image           tested
        */
    }
}
