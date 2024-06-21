using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Server.Source.Logic;
using Server.Source.Models.DTOs.User.Access;
using Server.Source.Models.DTOs.User.Address;
using System.Security.Claims;

namespace Server.Controllers
{
    public partial class BusinessController
    {
        // TODO: menu
        /*
            crear menu
            actualizar menu
            borrar menu
         */

        /// <summary>
        /// Listado de menus
        /// </summary>
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Authorize(Roles = "user-boss")]
        [HttpGet(template: "menus/{sortColumn}/{sortOrder}/{pageSize}/{pageNumber}")]
        public async Task<ActionResult> GetMenusByPage(string sortColumn, string sortOrder, int pageSize, int pageNumber, string? term = null)
        {
            var result = await _businessLogicMenu.GetMenusByPageAsync(sortColumn, sortOrder, pageSize, pageNumber, term);
            return Ok(result);
        }

        /// <summary>
        /// Obtiene menu
        /// </summary>
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Authorize(Roles = "user-boss")]
        [HttpGet(template: "menus/{id}")]
        public async Task<ActionResult> GetMenu(int id)
        {
            var result = await _businessLogicMenu.GetMenuAsync(id);
            return Ok(result);
        }        
    }
}
