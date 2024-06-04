using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Server.Migrations;
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

        public async Task CreateAddressAsync(AddressEntity address)
        {
            _context.Addresses.Add(address);
            await _context.SaveChangesAsync();
        }

        public async Task<bool> ExistsAsync(string userId, int? id, string name)
        {
            Expression<Func<AddressEntity, bool>> expId = p => true;
            if (id != null)
            {
                expId = p => p.Id != id;
            }

            var exists = await _context.Addresses.Where(expId).Where(p => p.UserId == userId && p.Name == name).AnyAsync();
            return exists;
        }

        public IQueryable<AddressEntity> GetAddress(string userId, int id)
        {
            return _context.Addresses.Where(p => p.UserId == userId).Where(p => p.Id == id);
        }

        public IQueryable<AddressEntity> GetAddressesByPage(string userId, string sortColumn, string sortOrder, int pageSize, int pageNumber, string term, out int grandTotal)
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
            iq = _context.Addresses.Where(p => p.UserId == userId).Where(expSearch);

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

        public async Task ResetDefaultAsync(string userId, int defaultAddressId)
        {
            var defaults = await _context.Addresses.Where(p => p.UserId == userId).Where(p => p.Id != defaultAddressId && p.IsDefault).ToListAsync();

            defaults.ForEach(p =>
            {
                p.IsDefault = false;
            });

            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync()
        {
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAddressAsync(AddressEntity address)
        {
            _context.Addresses.Remove(address!);
            await _context.SaveChangesAsync();
        }
    }
}
