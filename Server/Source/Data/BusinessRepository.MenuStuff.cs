using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Server.Source.Data.Interfaces;
using Server.Source.Exceptions;
using Server.Source.Models.Entities;
using Server.Source.Models.Enums;
using System.Linq.Expressions;
using System.Net;
using System.Xml.Linq;

namespace Server.Source.Data
{
    public partial class BusinessRepository
    {
        public IQueryable<MenuStuffEntity> GetMenuStuff(int menuId)
        {
            var iq = _context.MenuStuff.Where(p => p.MenuId == menuId);
            return iq;
        }

        public async Task AddElementAsync(MenuStuffEntity element)
        {
            _context.MenuStuff.Add(element);
            await _context.SaveChangesAsync();
        }

        public async Task RemoveElementAsync(Expression<Func<MenuStuffEntity, bool>> exp)
        {
            var iq = _context.MenuStuff.Where(exp);
            _context.Remove(iq);
            await _context.SaveChangesAsync();
        }

        public async Task<int?> GetPositionFromLastElementAsync(Expression<Func<MenuStuffEntity, bool>> exp)
        {
            var position = await _context.MenuStuff
                .Where(exp)
                .OrderByDescending(p => p.Position)
                .Select(p => p.Position)
                .FirstOrDefaultAsync();

            return position ?? 0;
        }
    }
}
