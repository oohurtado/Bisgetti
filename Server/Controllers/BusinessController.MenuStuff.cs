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
        public async Task<ActionResult> AddElement([FromBody] AddElementRequest request)
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
        public async Task<ActionResult> RemoveElement([FromBody] RemoveElementRequest request)
        {
            await _businessLogicMenuStuff.RemoveElementAsync(request);
            return Ok();
        }



        // TODO: oohg menu stuff

        /*        
            get categories                      business/categories
            get products                        business/products
            get menu stuff                      business/menu-stuff/{menuId}









            * Elementos agregar/quitar
                * agregar 'categoria a menu'/'producto a categoria'
                    * post
                    * menu-builder/element
                    * AddElement(int? menuId, int? categoryId, int? productId, string action=category-to-menu/product-to-category)
                *  quitar 'categoria de menu'/'producto de menu'
                    *  delete
                    *  menu-buider/element
                    *  DeleteElement(int? menuId, int? categoryId, int? productId, string action=category-from-menu/product-from-category)
        
            * Visibilidad 
                - Mostrar/Ocultar = isVisible            
                - Disponible/No disponible = isAvailable
                - Vendido = isSoldOut
                * actualizar ...
                    * put
                    * menu-builder/element/visibility
                    * UpdateVisibilityElement(int elementId, string elementType=menu/category/product, string field=visible/available/sold-out, bool value=true/false)

            * Mover elementos en el menu
                * move up/down
                    * put
                    * menu-builder/element/position
                    * UpdatePositionElement(elementId, direction=up/down) 
         
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
