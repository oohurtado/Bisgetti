using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Server.Source.Logic;
using Server.Source.Models.DTOs.UseCases.Cart;
using System.Security.Claims;

namespace Server.Controllers
{
    public partial class BusinessController
    {
        ///// <summary>
        ///// Listado de pedidos - por página
        ///// </summary>
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        //[Authorize(Roles = "user-boss,user-customer")]
        //[HttpGet(template: "orders/{sortColumn}/{sortOrder}/{pageSize}/{pageNumber}")]
        //public async Task<ActionResult> GetOrdersByPage(string sortColumn, string sortOrder, int pageSize, int pageNumber, string? term = null)
        //{
        //    var result = await _businessLogicOrder.GetOrdersByPageAsync(sortColumn, sortOrder, pageSize, pageNumber, term);
        //    return Ok(result);
        //}
    }
}
