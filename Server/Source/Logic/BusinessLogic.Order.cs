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
using Server.Source.Helpers;
using Server.Source.Models.DTOs.UseCases.Order;
using Microsoft.AspNetCore.SignalR;
using Server.Source.Models.Hubs;

namespace Server.Source.Logic
{
    public class BusinessLogicOrder
    {
        private readonly IBusinessRepository _businessRepository;
        private readonly ILiveNotificationService _liveNotificationService;
        private readonly IMapper _mapper;

        public BusinessLogicOrder(
            IBusinessRepository businessRepository,
            ILiveNotificationService liveNotificationService,
            IMapper mapper
            )
        {
            _businessRepository = businessRepository;
            _liveNotificationService = liveNotificationService;
            _mapper = mapper;
        }

        public async Task<PageResponse<OrderResponse>> GetOrdersByPageAsync(string userId, string userRole, string sortColumn, string sortOrder, int pageSize, int pageNumber, string filter)
        {
            var filters = filter.Split(',').ToList();
            var result = await _businessRepository.Order_GetOrdersByPage(userId, userRole, sortColumn, sortOrder, pageSize, pageNumber, out int grandTotal, filters)
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
                    AddressJson = p.AddressJson,
                    ProductCount = p.ProductCount,
                    ProductTotal = p.ProductTotal,    
                    OrderElements = p.OrderElements.Select(q => new OrderElementResponse()
                    {
                        Id = q.Id,
                        OrderId = q.OrderId,
                        PersonName = q.PersonName,
                        ProductDescription = q.ProductDescription,
                        ProductIngredients = q.ProductIngredients,
                        ProductName = q.ProductName,
                        ProductPrice = q.ProductPrice,
                        ProductQuantity = q.ProductQuantity,                        
                    })
                    .ToList(),
                    OrderStatuses = p.OrderStatuses.Select(q => new OrderStatusResponse()
                    {
                        Id = q.Id,
                        OrderId = q.OrderId,
                        EventAt = q.EventAt,
                        Status = q.Status,                        
                    }).ToList()
                })
                .ToListAsync();

            result.ForEach(p =>
            {
                if (!string.IsNullOrEmpty(p!.AddressJson))
                {
                    p.Address = JsonSerializer.Deserialize<AddressResponse>(p.AddressJson);
                    p.AddressJson = null;
                }
            });

            return new PageResponse<OrderResponse>
            {
                GrandTotal = grandTotal,
                Data = result!,
            };
        }

        public async Task<OrderResponse> GetOrderAsync(string userId, string userRole, int orderId)
        {    
            var result = await _businessRepository.Order_GetOrder(userId, userRole, orderId)
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
                    AddressJson = p.AddressJson,
                    ProductCount = p.ProductCount,
                    ProductTotal = p.ProductTotal,
                    OrderElements = p.OrderElements.Select(q => new OrderElementResponse()
                    {
                        Id = q.Id,
                        OrderId = q.Id,
                        PersonName = q.PersonName,
                        ProductDescription = q.ProductDescription,
                        ProductIngredients = q.ProductIngredients,
                        ProductName = q.ProductName,
                        ProductPrice = q.ProductPrice,
                        ProductQuantity = q.ProductQuantity,                        
                    })
                    .ToList(),
                    OrderStatuses = p.OrderStatuses.Select(q => new OrderStatusResponse()
                    { 
                        Id = q.Id,
                        Status = q.Status,
                        EventAt = q.EventAt,
                    })
                    .ToList()                    
                })
                .FirstOrDefaultAsync();

            if (!string.IsNullOrEmpty(result!.AddressJson))
            {
                result.Address = JsonSerializer.Deserialize<AddressResponse>(result.AddressJson);
                result.AddressJson = null;
            }

            return result!;
        }

        public async Task OrderNextStepAsync(string userId, string userRole, int orderId, OrderChangeStatusRequest request)
        {
            var result = await _businessRepository.Order_GetOrder(userId, userRole, orderId)
                .FirstOrDefaultAsync();

            if (result == null)
            {
                throw new EatSomeNotFoundErrorException(EnumResponseError.OrderNotFound);
            }

            if (result.Status != request.CurrentStatus)
            {
                throw new EatSomeNotFoundErrorException(EnumResponseError.OrderHasDifferentStatus);
            }

            result.Status = OrderHelper.NextStep(currentStatus: request.CurrentStatus!, deliveryMethod: result.DeliveryMethod!).GetDescription();
            result.UpdatedAt = DateTime.Now;
            result.OrderStatuses.Add(new OrderStatusEntity()
            {
                EventAt = DateTime.Now,
                Status = result.Status,
            });
            await _businessRepository.UpdateAsync();
            await _liveNotificationService.NotifyToEmployeesInformationAboutAnOrder("ORDER-UPDATED", orderId.ToString(), userRole, $"{EnumRole.UserBoss.GetDescription()},{EnumRole.UserChef.GetDescription()}", userId, statusFrom: null!, statusTo: null!);
        }

        public async Task OrderCanceledAsync(string userId, string userRole, int orderId, OrderChangeStatusRequest request)
        {
            var result = await _businessRepository.Order_GetOrder(userId, userRole, orderId)
                .FirstOrDefaultAsync();

            if (result == null)
            {
                throw new EatSomeNotFoundErrorException(EnumResponseError.OrderNotFound);
            }

            if (result.Status != request.CurrentStatus)
            {
                throw new EatSomeNotFoundErrorException(EnumResponseError.OrderHasDifferentStatus);
            }

            result.Status = OrderHelper.Canceled(currentStatus: request.CurrentStatus!).GetDescription();
            result.UpdatedAt = DateTime.Now;
            result.OrderStatuses.Add(new OrderStatusEntity()
            {
                EventAt = DateTime.Now,
                Status = result.Status,
            });
            await _businessRepository.UpdateAsync();
            await _liveNotificationService.NotifyToEmployeesInformationAboutAnOrder("ORDER-CANCELED", orderId.ToString(), userRole, $"{EnumRole.UserBoss.GetDescription()},{EnumRole.UserChef.GetDescription()}", userId, statusFrom: null!, statusTo: null!);            
        }

        public async Task OrderDeclinedAsync(string userId, string userRole, int orderId, OrderChangeStatusRequest request)
        {
            var result = await _businessRepository.Order_GetOrder(userId, userRole, orderId)
                .FirstOrDefaultAsync();

            if (result == null)
            {
                throw new EatSomeNotFoundErrorException(EnumResponseError.OrderNotFound);
            }

            if (result.Status != request.CurrentStatus)
            {
                throw new EatSomeNotFoundErrorException(EnumResponseError.OrderHasDifferentStatus);
            }

            result.Status = OrderHelper.Declined(currentStatus: request.CurrentStatus!).GetDescription();
            result.UpdatedAt = DateTime.Now;
            result.OrderStatuses.Add(new OrderStatusEntity()
            {
                EventAt = DateTime.Now,
                Status = result.Status,
            });
            await _businessRepository.UpdateAsync();
            await _liveNotificationService.NotifyToEmployeesInformationAboutAnOrder("ORDER-DECLINED", orderId.ToString(), userRole, $"{EnumRole.UserBoss.GetDescription()},{EnumRole.UserChef.GetDescription()}", userId, statusFrom: null!, statusTo: null!);
        }
    }
}
