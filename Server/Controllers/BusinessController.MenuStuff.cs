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
        [HttpPut(template: "menu-stuff/element/move")]
        public async Task<ActionResult> MoveElement([FromBody] MoveElementRequest request)
        {
            await _businessLogicMenuStuff.MoveElementAsync(request);
            return Ok();
        }

        // TODO: oohg menu stuff        

        /*        
            get menu stuff                      business/menu-stuff/{menuId}                tested
            get categories                      business/categories                         tested
            get products                        business/products                           tested
            put add or remove element           business/menu-stuff/element                 tested
            put move element                    business/menu-stuff/element/move           
        
            * Visibilidad 
                - Mostrar/Ocultar = isVisible                   // menu, category, product      
                - Disponible/No disponible = isAvailable        // menu, product
                - Vendido = isSoldOut                           // product
                * actualizar ...
                    * put
                    * menu-builder/element/visibility
                    * UpdateVisibilityElement(int elementId, string elementType=menu/category/product, string field=visible/available/sold-out, bool value=true/false)
         
            * Imagenes                 
                * agregar imagen a menu/categoria/producto
                    * post
                    * menu-builder/element/image
                    * AddImage(elementId, typeElement=menu/category/product, file)
                *  quitar imagen de menu/categoria/producto
                    * delete
                    * menu-builder/element/image
                    * DeleteImage(elementId, typeElement=menu/category/product)
                    
        */
    }
}
