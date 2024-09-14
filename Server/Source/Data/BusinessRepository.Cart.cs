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
        public IQueryable<PersonEntity> Cart_GetPeople(string userId)
        {
            return _context.People.Where(p => p.UserId == userId);
        }

        public IQueryable<PersonEntity> Cart_GetPeople(string userId, Expression<Func<PersonEntity, bool>> exp)
        {
            return _context.People.Where(p => p.UserId == userId).Where(exp);
        }

        public IQueryable<AddressEntity> Cart_GetAddresses(string userId)
        {
            IQueryable<AddressEntity> iq;
            IOrderedQueryable<AddressEntity> ioq = null!;

            iq = _context.Addresses.Where(p => p.UserId == userId);
            ioq = iq.OrderBy(p => p.IsDefault).ThenBy(p => p.Name);

            return ioq.AsNoTracking();
        }

        public async Task Cart_AddPersonToUser(PersonEntity person)
        {
            _context.People.Add(person);
            await _context.SaveChangesAsync();
        }

        public async Task Cart_AddProductToCartAsync(CartElementEntity cartElement)
        {
            _context.CartElements.Add(cartElement);
            await _context.SaveChangesAsync();            
        }

        public IQueryable<CartElementEntity> Cart_GetProductsFromCart(string userId)
        {
            return _context.CartElements
                .Include(p => p.Product)
                .Where(p => p.UserId == userId);
        }

        public async Task Cart_DeleteProductFromCartAsync(CartElementEntity cartElement)
        {
            _context.CartElements.Remove(cartElement);
            await _context.SaveChangesAsync();
        }


        public async Task<int> Cart_GetNumberOfProductsInCartAsync(string userId, Expression<Func<CartElementEntity, bool>> exp)
        {
            var total = await _context.CartElements
                .Where(p => p.UserId == userId)
                .Where(exp)
                .SumAsync(p => p.ProductQuantity);
            return total;
        }

        public async Task<decimal> Cart_GetTotalOfProductsInCartAsync(string userId, Expression<Func<CartElementEntity, bool>> exp)
        {
            var total = await _context.CartElements
                .Include(p => p.Product)
                .Where(p => p.UserId == userId)
                .Where(exp)
                .SumAsync(p => p.ProductQuantity * p.Product.Price);
            return total;
        }

        public async Task Cart_CreateRequestAsync(string userId, RequestEntity request_toCreate, List<int> cartElementIds)
        {            
            using var transaction = _context.Database.BeginTransaction();

            try
            {
                _context.Requests.Add(request_toCreate!);
                await _context.CartElements.Where(p => p.UserId == userId && cartElementIds.Contains(p.Id)).ExecuteDeleteAsync();
                await _context.SaveChangesAsync();
                transaction.Commit();
            }
            catch (Exception)
            {
                throw new EatSomeInternalErrorException(EnumResponseError.InternalServerError);
            }
        }
    }
}
