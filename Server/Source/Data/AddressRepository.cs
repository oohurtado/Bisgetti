using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Server.Migrations;
using Server.Source.Data.Interfaces;
using Server.Source.Exceptions;
using Server.Source.Models.Entities;
using Server.Source.Models.Enums;
using System.Linq.Expressions;
using System.Net;

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

        public IQueryable<AddressEntity> GetAddresses(string userId)
        {
            IQueryable<AddressEntity> iq;
            IOrderedQueryable<AddressEntity> ioq = null!;

            iq = _context.Addresses.Where(p => p.UserId == userId);
            ioq = iq.OrderBy(p => p.Name);

            return ioq.AsNoTracking();
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

        public async Task<int> CountAsync(string userId)
        {
            var count = await _context.Addresses.Where(p => p.UserId == userId).CountAsync();
            return count;
        }
    }
}
