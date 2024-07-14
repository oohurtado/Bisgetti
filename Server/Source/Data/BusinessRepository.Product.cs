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
        public IQueryable<ProductEntity> GetProduct(int id)
        {
            return _context.Products.Where(p => p.Id == id);
        }

        public IQueryable<ProductEntity> GetProductsByPage(string sortColumn, string sortOrder, int pageSize, int pageNumber, string term, out int grandTotal)
        {
            IQueryable<ProductEntity> iq;
            IOrderedQueryable<ProductEntity> ioq = null!;

            // busqueda
            Expression<Func<ProductEntity, bool>> expSearch = p => true;
            if (!string.IsNullOrEmpty(term))
            {
                expSearch = p =>
                    p.Name!.Contains(term) ||
                    p.Description!.Contains(term) ||
                    p.Ingredients!.Contains(term);                    
            }
            iq = _context.Products.Where(expSearch);

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
            else if (sortColumn == "price")
            {
                if (sortOrder == "asc")
                {
                    ioq = iq.OrderBy(p => p.Price);
                }
                else if (sortOrder == "desc")
                {
                    ioq = iq.OrderByDescending(p => p.Price);
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

        public IQueryable<ProductEntity> GetProducts()
        {
            var iq = _context.Products;
            return iq;
        }

        public async Task CreateProductAsync(ProductEntity product)
        {
            _context.Products.Add(product);
            await _context.SaveChangesAsync();
        }

        public async Task<bool> ExistsProductAsync(int? id, string name)
        {
            Expression<Func<ProductEntity, bool>> expId = p => true;
            if (id != null)
            {
                expId = p => p.Id != id;
            }

            var exists = await _context.Products.Where(expId).Where(p => p.Name == name).AnyAsync();
            return exists;
        }

        public async Task DeleteProductAsync(ProductEntity product)
        {
            _context.Products.Remove(product!);
            await _context.SaveChangesAsync();
        }
    }
}
