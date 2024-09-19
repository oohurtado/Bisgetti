using AutoMapper;
using Server.Source.Data.Interfaces;
using Server.Source.Exceptions;
using Server.Source.Models.DTOs.Common;
using Server.Source.Models.Entities;
using Server.Source.Models.Enums;
using Microsoft.EntityFrameworkCore;
using Microsoft.Data.SqlClient;
using Server.Source.Data;
using Server.Source.Services.Interfaces;
using Server.Source.Utilities;
using Server.Source.Models.DTOs.Entities;
using Server.Source.Models.DTOs.UseCases.Cart;
using Server.Source.Extensions;
using System.Text.Json;
using AutoMapper.Execution;
using Server.Source.Models.DTOs.UseCases.Order;

namespace Server.Source.Logic
{
    public class BusinessLogicOrder
    {
        private readonly IBusinessRepository _businessRepository;
        private readonly IMapper _mapper;

        public BusinessLogicOrder(
            IBusinessRepository businessRepository,
            IMapper mapper
            )
        {
            _businessRepository = businessRepository;
            _mapper = mapper;
        }

        public async Task<PageResponse<OrderForCustomerResponse>> GetOrdersForCustomerByPageAsync(string userId, string sortColumn, string sortOrder, int pageSize, int pageNumber)
        {
            var result = await _businessRepository.Order_GetOrdersForCustomerByPage(userId, sortColumn, sortOrder, pageSize, pageNumber, out int grandTotal)
                .Select(p => new OrderForCustomerResponse(p.AddressJson)
                {
                    Id = p.Id,
                    Comments = p.Comments,
                    CreatedAt = p.CreatedAt,
                    DeliveryMethod = p.DeliveryMethod,
                    ShippingCost = p.ShippingCost,
                    TipPercent = p.TipPercent,                                       
                    PersonNames = p.OrderElements.Select(q => q.PersonName).Distinct().ToList()!,
                    ProductsSum = p.OrderElements.Sum(q => q.ProductPrice * q.ProductQuantity),
                    ProductsCount = p.OrderElements.Sum(q => q.ProductQuantity),
                    OrderStatus = p.OrderStatuses
                        .OrderByDescending(q => q.EventAt)
                        .Select(q => new OrderStatusResponse() 
                        { 
                            Id = q.Id, 
                            EventAt = q.EventAt, 
                            Status = q.Status 
                        })
                        .FirstOrDefault(),                    
                })
                .ToListAsync();

            return new PageResponse<OrderForCustomerResponse>
            {
                GrandTotal = grandTotal,
                Data = result!,
            };
        }
    }
}
