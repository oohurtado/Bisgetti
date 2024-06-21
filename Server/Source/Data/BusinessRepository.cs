using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Server.Source.Data.Interfaces;
using Server.Source.Exceptions;
using Server.Source.Models.Entities;
using Server.Source.Models.Enums;
using System.Linq.Expressions;

namespace Server.Source.Data
{
    public class BusinessRepository : IBusinessRepository
    {
        private readonly DatabaseContext _context;

        public BusinessRepository(DatabaseContext context)
        {
            _context = context;
        }

        public IQueryable<MenuEntity> GetMenu(int id)
        {
            return _context.Menus.Where(p => p.Id == id);
        }

        public IQueryable<MenuEntity> GetMenusByPage(string sortColumn, string sortOrder, int pageSize, int pageNumber, string term, out int grandTotal)
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
    }
}
