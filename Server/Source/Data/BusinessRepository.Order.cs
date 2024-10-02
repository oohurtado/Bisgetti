using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Server.Source.Data.Interfaces;
using Server.Source.Exceptions;
using Server.Source.Extensions;
using Server.Source.Models.Entities;
using Server.Source.Models.Enums;
using System.Linq.Expressions;
using System.Net;

namespace Server.Source.Data
{
    public partial class BusinessRepository
    {
        public IQueryable<OrderEntity> Order_GetOrdersByPage(string userId, string userRole, string sortColumn, string sortOrder, int pageSize, int pageNumber, out int grandTotal, List<string> filters)
        {
            IQueryable<OrderEntity> iq;
            IOrderedQueryable<OrderEntity> ioq = null!;
           
            Expression<Func<OrderEntity, bool>> exp = p => true;
            if (userRole == EnumRole.UserCustomer.GetDescription())
            {
                exp = p => p.UserId == userId;
            }            
            iq = _context.Orders.Include(p => p.OrderElements).Include(p => p.OrderStatuses).Where(exp);

            // conteo
            grandTotal = iq.Count();

            // filtro status
            iq = iq.Where(p => filters.Contains(p.Status!));            

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

        public IQueryable<OrderEntity> Order_GetOrder(string userId, string userRole, int orderId)
        {
            Expression<Func<OrderEntity, bool>> exp = p => true;
            if (userRole == EnumRole.UserCustomer.GetDescription())
            {
                exp = p => p.UserId == userId && p.Id == orderId;
            }
            else
            {
                exp = p => p.Id == orderId;
            }
            
            return _context.Orders.Where(exp);
        }

        public IQueryable<OrderElementEntity> Order_GetOrderElements(string userId, int orderId)
        {
            return _context.OrderElements
                .Include(p => p.Order)                
                .Where(p => p.Order.UserId == userId && p.OrderId == orderId);
        }

        public IQueryable<OrderStatusEntity> Order_GetOrderStatuses(string userId, int orderId)
        {
            return _context.OrderStatuses
                .Include(p => p.Order)
                .Where(p => p.Order.UserId == userId && p.OrderId == orderId);
        }
    }
}
