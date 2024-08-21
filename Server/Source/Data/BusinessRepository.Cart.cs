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
        public IQueryable<PersonEntity> GetPeople(string userId)
        {
            return _context.People.Where(p => p.UserId == userId);
        }

        public IQueryable<PersonEntity> GetPeople(string userId, Expression<Func<PersonEntity, bool>> exp)
        {
            return _context.People.Where(p => p.UserId == userId).Where(exp);
        }

        public async Task AddPersonToUser(PersonEntity person)
        {
            _context.People.Add(person);
            await _context.SaveChangesAsync();
        }

        public async Task AddProductCartAsync(CartElementEntity cartElement)
        {
            _context.CartElements.Add(cartElement);
            await _context.SaveChangesAsync();            
        }

        public IQueryable<CartElementEntity> GetProductsFromCart(string userId)
        {
            return _context.CartElements
                .Include(p => p.Product)
                .Where(p => p.UserId == userId);
        }

        public async Task<int> GetNumberOfProductsInCartAsync(string userId, Expression<Func<CartElementEntity, bool>> exp)
        {
            var total = await _context.CartElements
                .Where(p => p.UserId == userId)
                .Where(exp)
                .SumAsync(p => p.ProductQuantity);
            return total;
        }
    }
}
