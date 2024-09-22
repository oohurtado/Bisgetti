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

        public async Task<PageResponse<OrderResponse>> GetOrdersByPageAsync(string userId, string userRole, string sortColumn, string sortOrder, int pageSize, int pageNumber)
        {
            var result = await _businessRepository.Order_GetOrdersByPage(userId, sortColumn, sortOrder, pageSize, pageNumber, out int grandTotal)
                .Select(p => new OrderResponse
                {
                    Id = p.Id,

                    Status = p.Status,
                    CreatedAt = p.CreatedAt,
                    UpdatedAt = p.UpdatedAt,
                    ShippingCost = p.ShippingCost,
                    TipPercent = p.TipPercent,
                    DeliveryMethod = p.DeliveryMethod,
                    Comments = p.Comments,
                    PayingWith = p.PayingWith,
                    AddressName = p.AddressName,
                    ProductCount = p.ProductCount,
                    ProductTotal = p.ProductTotal,                    
                    PersonNames = p.OrderElements.Select(q => q.PersonName).Distinct().ToList()!,                   
                })
                .ToListAsync();

            return new PageResponse<OrderResponse>
            {
                GrandTotal = grandTotal,
                Data = result!,
            };
        }

        public async Task<List<OrderElementResponse>> GetOrderElementsAsync(string userId, string userRole, int orderId)
        {
            var orderElements = await _businessRepository.Order_GetOrderElements(userId, orderId)
                .Select(p => new OrderElementResponse()
                {
                    Id = p.Id,
                    OrderId = p.OrderId,

                    PersonName = p.PersonName,
                    ProductDescription = p.ProductDescription,
                    ProductIngredients = p.ProductIngredients,
                    ProductName = p.ProductName,
                    ProductPrice = p.ProductPrice,
                    ProductQuantity = p.ProductQuantity,                    
                })
                .ToListAsync();

            return orderElements;
        }

        internal async Task<List<OrderStatusResponse>> GetOrderStatusesAsync(string userId, string userRole, int orderId)
        {
            var orderStatuses = await _businessRepository.Order_GetOrderStatuses(userId, orderId)
                .Select(p => new OrderStatusResponse()
                {
                    Id = p.Id,
                    OrderId = p.OrderId,

                    Status = p.Status,
                    EventAt = p.EventAt,
                })
                .ToListAsync();

            return orderStatuses;
        }
    }
}
