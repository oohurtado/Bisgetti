using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Server.Source.Data.Interfaces;
using Server.Source.Exceptions;
using Server.Source.Models.Entities;
using Server.Source.Models.Enums;
using System.Linq.Expressions;
using System.Net;

namespace Server.Source.Data
{
    public partial class BusinessRepository
    {
        public IQueryable<MenuStuffEntity> GetMenuStuff(int menuId)
        {
            var iq = _context.MenuStuff.Where(p => p.MenuId == menuId);
            return iq;
        }
    }
}
