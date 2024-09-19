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
        public IQueryable<OrderEntity> Order_GetOrdersForCustomerByPage(string userId, string sortColumn, string sortOrder, int pageSize, int pageNumber, out int grandTotal)
        {
            IQueryable<OrderEntity> iq;
            IOrderedQueryable<OrderEntity> ioq = null!;
           
            iq = _context.Orders
                .Include(p => p.OrderElements)
                .Include(p => p.OrderStatuses)
                .Where(p => p.UserId == userId);

            // conteo
            grandTotal = iq.Count();

            // ordenamiento
            if (sortColumn == "event")
            {
                if (sortOrder == "asc")
                {
                    ioq = iq.OrderBy(p => p.CreatedAt);
                }
                else if (sortOrder == "desc")
                {
                    ioq = iq.OrderByDescending(p => p.CreatedAt);
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
