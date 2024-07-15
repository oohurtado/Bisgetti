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
        /// Agregar elemento
        /// </summary>
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Authorize(Roles = "user-boss")]
        [HttpPost(template: "menu-stuff/element")]
        public async Task<ActionResult> AddElement([FromBody] ElementRequest request)
        {
            await _businessLogicMenuStuff.AddElementAsync(request);
            return Ok();
        }

        /// <summary>
        /// Agregar elemento
        /// </summary>
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Authorize(Roles = "user-boss")]
        [HttpDelete(template: "menu-stuff/element")]
        public async Task<ActionResult> RemoveElement([FromBody] ElementRequest request)
        {
            await _businessLogicMenuStuff.RemoveElementAsync(request);
            return Ok();
        }



        // TODO: oohg menu stuff        

        /*        
            ! crear index a menu-stuff
            ! crear menu en menu-stuff al crear un menu

            get menu stuff                      business/menu-stuff/{menuId}                tested
            get categories                      business/categories                         tested
            get products                        business/products                           tested
            post add element                    business/menu-stuff/element                 pending to test
            delete remove element               business/menu-stuff/element                 pending to test





           * Mover elementos en el menu
                * move up/down
                    * put
                    * menu-builder/element/position
                    * UpdatePositionElement(elementId, direction=up/down) 
        
            * Visibilidad 
                - Mostrar/Ocultar = isVisible            
                - Disponible/No disponible = isAvailable
                - Vendido = isSoldOut
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
