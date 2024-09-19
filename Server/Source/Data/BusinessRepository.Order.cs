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
           
            iq = _context.Orders.Where(p => p.UserId == userId);

            // conteo
            grandTotal = iq.Count();

            //// ordenamiento
            //if (sortColumn == "name")
            //{
            //    if (sortOrder == "asc")
            //    {
            //        ioq = iq.OrderBy(p => p.Name);
            //    }
            //    else if (sortOrder == "desc")
            //    {
            //        ioq = iq.OrderByDescending(p => p.Name);
            //    }
            //}
            //else if (sortColumn == "price")
            //{
            //    if (sortOrder == "asc")
            //    {
            //        ioq = iq.OrderBy(p => p.Price);
            //    }
            //    else if (sortOrder == "desc")
            //    {
            //        ioq = iq.OrderByDescending(p => p.Price);
            //    }
            //}
            //else
            //{
            //    throw new EatSomeInternalErrorException(EnumResponseError.SortColumnKeyNotFound);
            //}

            // paginacion
            iq = ioq!
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize);

            return iq.AsNoTracking();
        }
    }
}
