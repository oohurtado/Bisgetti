﻿using Microsoft.AspNetCore.Identity;
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
        public IQueryable<MenuStuffEntity> MenuStuff_GetMenuStuff(int menuId)
        {
            var iq = _context.MenuStuff.Where(p => p.MenuId == menuId);
            return iq;
        }

        public async Task MenuStuff_AddElementAsync(MenuStuffEntity element)
        {
            _context.MenuStuff.Add(element);
            await _context.SaveChangesAsync();
        }

        public async Task MenuStuff_RemoveElementAsync(Expression<Func<MenuStuffEntity, bool>> exp)
        {
            var iq = _context.MenuStuff.Where(exp);
            var entities = await iq.ToListAsync();
            _context.MenuStuff.RemoveRange(entities);
            await _context.SaveChangesAsync();
        }

        public async Task<int?> MenuStuff_GetPositionFromLastElementAsync(Expression<Func<MenuStuffEntity, bool>> exp)
        {
            var position = await _context.MenuStuff
                .Where(exp)
                .OrderByDescending(p => p.Position)
                .Select(p => p.Position)
                .FirstOrDefaultAsync();

            return position ?? 0;
        }

        public async Task<bool> MenuStuff_ElementExistsAsync(Expression<Func<MenuStuffEntity, bool>> exp)
        {
            var any = await _context.MenuStuff.Where(exp).AnyAsync();
            return any;
        }

        public IQueryable<MenuStuffEntity> MenuStuff_GetMenuStuff(Expression<Func<MenuStuffEntity, bool>> exp)
        {
            var iq = _context.MenuStuff.Where(exp);
            return iq;
        }
    }
}
