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
        public IQueryable<MenuEntity> Menu_GetMenu(int id)
        {
            return _context.Menus.Where(p => p.Id == id);
        }

        public IQueryable<MenuEntity> Menu_GetMenusByPage(string sortColumn, string sortOrder, int pageSize, int pageNumber, string term, out int grandTotal)
        {
            IQueryable<MenuEntity> iq;
            IOrderedQueryable<MenuEntity> ioq = null!;

            // busqueda
            Expression<Func<MenuEntity, bool>> expSearch = p => true;
            if (!string.IsNullOrEmpty(term))
            {
                expSearch = p =>
                    p.Name!.Contains(term) ||
                    p.Description!.Contains(term);                    
            }
            iq = _context.Menus.Where(expSearch);

            // conteo
            grandTotal = iq.Count();

            // ordenamiento
            if (sortColumn == "name")
            {
                if (sortOrder == "asc")
                {
                    ioq = iq.OrderBy(p => p.Name);
                }
                else if (sortOrder == "desc")
                {
                    ioq = iq.OrderByDescending(p => p.Name);
                }
            }
            else
            {
                throw new EatSomeInternalErrorException(EnumResponseError.SortColumnKeyNotFound);
            }

            // paginacion
            iq = ioq!
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize);

            return iq.AsNoTracking();
        }

        public async Task Menu_CreateMenuAsync(MenuEntity menu)
        {
            _context.Menus.Add(menu);
            await _context.SaveChangesAsync();

            var menuStuff = new MenuStuffEntity()
            {
                MenuId = menu.Id,
            };
            _context.MenuStuff.Add(menuStuff);
            await _context.SaveChangesAsync();

        }

        public async Task<bool> Menu_ExistsMenuAsync(int? id, string name)
        {
            Expression<Func<MenuEntity, bool>> expId = p => true;
            if (id != null)
            {
                expId = p => p.Id != id;
            }

            var exists = await _context.Menus.Where(expId).Where(p => p.Name == name).AnyAsync();
            return exists;
        }

        public async Task Menu_DeleteMenuAsync(MenuEntity menu)
        {
            _context.Menus.Remove(menu!);
            await _context.SaveChangesAsync();
        }
    }
}
