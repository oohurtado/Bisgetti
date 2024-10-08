﻿using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Server.Source.Models.DTOs.UseCases.MenuStuff;

namespace Server.Controllers
{
    public partial class BusinessController
    {
        /// <summary>
        /// Devuelve menu activo
        /// </summary>
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [AllowAnonymous]
        [HttpGet(template: "menu-stuff/visible")]
        public async Task<ActionResult> GetVisibleMenu()
        {
            var result = await _businessLogicMenuStuff.GetVisibleMenuAsync();
            return Ok(result);
        }

        /// <summary>
        /// Cosas del menu
        /// </summary>
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [AllowAnonymous]
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
        [HttpPut(template: "menu-stuff/element/settings")]
        public async Task<ActionResult> UpdateElementSettings([FromBody] SettingsElementRequest request)
        {
            await _businessLogicMenuStuff.UpdateElementSettingsAsync(request);
            return Ok();
        }

        /// <summary>
        /// Obtener imagen del elemento
        /// </summary>
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Authorize(Roles = "user-boss")]
        [HttpGet(template: "menu-stuff/element/image/{menuId}/{categoryId}/{productId}")]
        public async Task<ActionResult> GetElementImage(int menuId, int categoryId, int productId)
        {
            var result = await _businessLogicMenuStuff.GetElementImageAsync(menuId, categoryId, productId);
            return Ok(result);
        }

        /// <summary>
        /// Crear o Cambiar imagen del elemento
        /// </summary>
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Authorize(Roles = "user-boss")]
        [HttpPut(template: "menu-stuff/element/image/{menuId}/{categoryId}/{productId}")]
        public async Task<ActionResult> UpdateElementImage([FromForm] ImageElementRequest request, int menuId, int categoryId, int productId)
        {
            await _businessLogicMenuStuff.UpdateElementImageAsync(request, menuId, categoryId, productId);
            return Ok();
        }

        /// <summary>
        /// Borra imagen del elemento
        /// </summary>
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Authorize(Roles = "user-boss")]
        [HttpDelete(template: "menu-stuff/element/image/{menuId}/{categoryId}/{productId}")]
        public async Task<ActionResult> DeleteElementImage(int menuId, int categoryId, int productId)
        {            
            await _businessLogicMenuStuff.DeleteElementImageAsync(menuId, categoryId, productId);
            return Ok();
        }
    }
}
