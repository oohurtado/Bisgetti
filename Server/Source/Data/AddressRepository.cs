using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Server.Source.Data.Interfaces;
using Server.Source.Exceptions;
using Server.Source.Models.Entities;
using Server.Source.Models.Enums;
using System.Linq.Expressions;

namespace Server.Source.Data
{
    public class AddressRepository : IAddressRepository
    {
        private readonly DatabaseContext _context;

        public AddressRepository(DatabaseContext context)
        {
            _context = context;
        }

        public async Task CreateAddressAsync(AddressEntity entity)
        {
            _context.Addresses.Add(entity);
            await _context.SaveChangesAsync();
        }

        public IQueryable<AddressEntity> GetAddress(int id)
        {
            return _context.Addresses.Where(p => p.Id == id);
        }

        public IQueryable<AddressEntity> GetAddressesByPage(string sortColumn, string sortOrder, int pageSize, int pageNumber, string term, out int grandTotal)
        {
            IQueryable<AddressEntity> iq;
            IOrderedQueryable<AddressEntity> ioq = null!;

            // busqueda
            Expression<Func<AddressEntity, bool>> expSearch = p => true;
            if (!string.IsNullOrEmpty(term))
            {
                expSearch = p =>
                    p.Name!.Contains(term);      
            }
            iq = _context.Addresses.Where(expSearch);

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

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
