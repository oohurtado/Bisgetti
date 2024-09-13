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
        public IQueryable<CategoryEntity> Category_GetCategory(int id)
        {
            return _context.Categories.Where(p => p.Id == id);
        }

        public IQueryable<CategoryEntity> Category_GetCategoriesByPage(string sortColumn, string sortOrder, int pageSize, int pageNumber, string term, out int grandTotal)
        {
            IQueryable<CategoryEntity> iq;
            IOrderedQueryable<CategoryEntity> ioq = null!;

            // busqueda
            Expression<Func<CategoryEntity, bool>> expSearch = p => true;
            if (!string.IsNullOrEmpty(term))
            {
                expSearch = p =>
                    p.Name!.Contains(term) ||
                    p.Description!.Contains(term);                    
            }
            iq = _context.Categories.Where(expSearch);

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

        public IQueryable<CategoryEntity> Category_GetCategories()
        {
            var iq = _context.Categories;
            return iq;
        }

        public async Task Category_CreateCategoryAsync(CategoryEntity category)
        {
            _context.Categories.Add(category);
            await _context.SaveChangesAsync();
        }

        public async Task<bool> Category_ExistsCategoryAsync(int? id, string name)
        {
            Expression<Func<CategoryEntity, bool>> expId = p => true;
            if (id != null)
            {
                expId = p => p.Id != id;
            }

            var exists = await _context.Categories.Where(expId).Where(p => p.Name == name).AnyAsync();
            return exists;
        }

        public async Task Category_DeleteCategoryAsync(CategoryEntity category)
        {
            _context.Categories.Remove(category!);
            await _context.SaveChangesAsync();
        }
    }
}
