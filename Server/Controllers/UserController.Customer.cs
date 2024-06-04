using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Server.Source.Extensions;
using Server.Source.Models.DTOs.User.Administration;
using Server.Source.Models.DTOs.User.Common;
using Server.Source.Models.Enums;
using System.Security.Claims;

namespace Server.Controllers
{
    public partial class UserController
    {
        // TODO: address get, post, put, put - default, delete
        // customer/address : GET
        // customer/address : POST
        // customer/address : PUT
        // customer/address : DELETE
        // customer/address : PUT - Default

        ///// <summary>
        ///// Listado de direcciones
        ///// </summary>
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        //[Authorize(Roles = "user-admin")]
        //[HttpGet(template: "addresses/{sortColumn}/{sortOrder}/{pageSize}/{pageNumber}")]
        //public async Task<ActionResult> AddressesList(string sortColumn, string sortOrder, int pageSize, int pageNumber, string? term = null)
        //{
        //    var result = await _userAddressLogic.GetAddressListByPageAsync(sortColumn, sortOrder, pageSize, pageNumber, term);
        //    return Ok(result);
        //}
    }
}
