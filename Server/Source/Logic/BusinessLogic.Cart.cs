﻿using AutoMapper;
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
using Server.Source.Models.Hubs;
using Server.Source.Semaphores;

namespace Server.Source.Logic
{
    public class BusinessLogicCart
    {
        private readonly IBusinessRepository _businessRepository;
        private readonly ILiveNotificationService _liveNotificationService;
        private readonly IMapper _mapper;
        private readonly IStorageFile _storageFile;
        private readonly MySemaphore _mySemaphore;
        private const string CONTAINER_FILE = "menu-images";

        public BusinessLogicCart(
            IBusinessRepository businessRepository,            
            ILiveNotificationService liveNotificationService,
            IMapper mapper,
            IStorageFile storageFile,
            MySemaphore mySemaphore
            )
        {
            _businessRepository = businessRepository;
            _liveNotificationService = liveNotificationService;
            _mapper = mapper;
            _storageFile = storageFile;
            _mySemaphore = mySemaphore;
        }

        public async Task<List<PersonResponse>> GetPeopleAsync(string userId)
        {
            var people = await _businessRepository.Cart_GetPeople(userId)
                .Select(p => new PersonResponse()
                {
                    PersonId = p.Id,
                    Name = p.Name,
                })
                .ToListAsync();
            

            return people;
        }

        public async Task<List<AddressResponse>> GetAddressesAsync(string userId)
        {
            var data = await _businessRepository.Cart_GetAddresses(userId).ToListAsync();
            var result = _mapper.Map<List<AddressResponse>>(data);
            return result;
        }

        public async Task<AddressResponse> GetAddressAsync(string userId, int addressId)
        {
            var data = await _businessRepository.Cart_GetAddresses(userId)
                .Where(p => p.UserId == userId && p.Id == addressId)
                .FirstOrDefaultAsync();
            var result = _mapper.Map<AddressResponse>(data);
            return result;
        }

        public async Task AddProductToCartAsync(string userId, AddProductToCartRequest request)
        {
            var cartElement = await _businessRepository
                .Cart_GetProductsFromCart(userId)
                .Where(p => p.ProductId == request.ProductId && p.PersonName == request.PersonName)
                .FirstOrDefaultAsync();

            if (cartElement != null)
            {
                cartElement.ProductQuantity += request.ProductQuantity;
                await _businessRepository.UpdateAsync();
            }
            else
            {
                var newCartElement = new CartElementEntity()
                {
                    UserId = userId,
                    PersonName = request.PersonName,
                    ProductId = request.ProductId,               
                    ProductQuantity = request.ProductQuantity,
                };
                await _businessRepository.Cart_AddProductToCartAsync(newCartElement);

                var exists = await _businessRepository.Cart_GetPeople(userId, p => p.Name == request.PersonName).AnyAsync();
                if (!exists)
                {
                    var person = new PersonEntity()
                    {
                        UserId = userId,
                        Name = request.PersonName,
                    };
                    await _businessRepository.Cart_AddPersonToUser(person);
                }
            }

        }

        public async Task UpdateProductFromCartAsync(string userId, UpdateProductFromCartRequest request)
        {
            var cartElement = await _businessRepository
                .Cart_GetProductsFromCart(userId)
                .Where(p => p.ProductId == request.ProductId && p.PersonName == request.PersonName)
                .FirstOrDefaultAsync();

            if (cartElement == null)
            {
                throw new EatSomeNotFoundErrorException(EnumResponseError.Product_ProductNotFound);
            }

            cartElement.ProductQuantity = request.ProductQuantity;
            await _businessRepository.UpdateAsync();
        }

        public async Task<List<CartElementResponse>> GetProductsFromCartAsync(string userId)
        {
            var cartElements = await _businessRepository
                .Cart_GetProductsFromCart(userId)
                .Select(p => new CartElementResponse()
                {
                    Id = p.Id,
                    PersonName = p.PersonName,
                    ProductId = p.ProductId,
                    ProductName = p.Product.Name,
                    ProductQuantity = p.ProductQuantity,                    
                    ProductPrice = p.Product.Price,
                })
                .ToListAsync();

            var menu = await _businessRepository.MenuStuff_GetMenuStuff(p => p.MenuId != null && p.CategoryId == null && p.ProductId == null).FirstOrDefaultAsync();
            if (menu != null)
            {
                var productIds = cartElements.Select(p => p.ProductId).ToList();
                var productImages = await _businessRepository.MenuStuff_GetMenuStuff(p => productIds.Contains(p.ProductId ?? 0)).Select(p => new { p.ProductId, p.Image }).ToListAsync();

                cartElements.ForEach(p => 
                {
                    var img = productImages.Where(q => q.ProductId == p.ProductId).Select(q => q.Image).FirstOrDefault();                    
                    p.ProductImage = GetUrl(img!);
                });
            }            
            
            return cartElements;
        }

        public async Task DeleteProductFromCartAsync(string userId, int id)
        {
            var cartElement = await _businessRepository
                .Cart_GetProductsFromCart(userId)
                .Where(p => p.Id == id)
                .FirstOrDefaultAsync();

            if (cartElement != null)
            {
                await _businessRepository.Cart_DeleteProductFromCartAsync(cartElement);
            }
        }

        public async Task<NumberOfProductsInCartResponse> GetNumberOfProductsInCartAsync(string userId)
        {
            var total = await _businessRepository.Cart_GetNumberOfProductsInCartAsync(userId, p => true);
            return new NumberOfProductsInCartResponse()
            {
                Total = total
            };
        }

        public async Task<TotalOfProductsInCartResponse> GetTotalOfProductsInCartAsync(string userId)
        {
            var total = await _businessRepository.Cart_GetTotalOfProductsInCartAsync(userId, p => true);
            return new TotalOfProductsInCartResponse()
            {
                Total = total
            };
        }

        public async Task<int?> CreateOrderForCustomerAsync(string userId, string userRole, CreateOrderForCustomerRequest request)
        {
            try
            {
                await _mySemaphore.OrderSemaphore.WaitAsync();

                var value = await _businessRepository
                        .Configuration_GetForOrders()
                        .Where(p => p.Section == "ordenes" && p.Key == "tienda-en-línea-abierta")
                        .Select(p => p.Value)
                        .FirstOrDefaultAsync();

                if (value == "False")
                {
                    throw new EatSomeInternalErrorException(EnumResponseError.Cart_OnlineStoreClosed);
                }

                List<OrderStatusEntity> GetFirstStatus()
                {
                    if (EnumDeliveryMethod.ForDelivery.GetDescription() == request.DeliveryMethod)
                    {
                        return
                        [
                            new()
                        {
                            EventAt = DateTime.Now,
                            Status = EnumOrderStatus.Received.GetDescription(),
                        }
                        ];
                    }
                    else if (EnumDeliveryMethod.TakeAway.GetDescription() == request.DeliveryMethod)
                    {
                        return
                        [
                            new OrderStatusEntity()
                        {
                            EventAt = DateTime.Now,
                            Status = EnumOrderStatus.Received.GetDescription(),
                        }
                        ];
                    }
                    throw new NotImplementedException();
                }

                var cartElements_db = await _businessRepository.Cart_GetProductsFromCart(userId).ToListAsync();
                var orderElements_toCreate = new List<OrderElementEntity>();

                if (cartElements_db.Count != request.CartElements!.Count)
                {
                    throw new EatSomeInternalErrorException(EnumResponseError.Cart_UpdateIsRequired);
                }

                // creamos OrderElements
                foreach (var cartElement_db in cartElements_db)
                {
                    var cartElement_request = request.CartElements.Where(p => p.CartElementId == cartElement_db.Id).FirstOrDefault();
                    if (cartElement_request == null)
                    {
                        throw new EatSomeInternalErrorException(EnumResponseError.Cart_UpdateIsRequired);
                    }

                    if (cartElement_request.ProductQuantity != cartElement_db.ProductQuantity)
                    {
                        throw new EatSomeInternalErrorException(EnumResponseError.Cart_UpdateIsRequired);
                    }

                    if (cartElement_request.ProductPrice != cartElement_db.Product.Price)
                    {
                        throw new EatSomeInternalErrorException(EnumResponseError.Cart_UpdateIsRequired);
                    }

                    orderElements_toCreate.Add(new OrderElementEntity()
                    {
                        PersonName = cartElement_db.PersonName,
                        ProductName = cartElement_db.Product.Name,
                        ProductDescription = cartElement_db.Product.Description,
                        ProductIngredients = cartElement_db.Product.Ingredients,
                        ProductPrice = cartElement_db.Product.Price,

                        ProductQuantity = cartElement_request.ProductQuantity,
                    });
                }

                var address = await _businessRepository.Cart_GetAddresses(userId).Where(p => p.Id == request.AddressId).FirstOrDefaultAsync();
                var addressJson = address == null ? null : JsonSerializer.Serialize(address);
                var addressName = address == null ? null : address.Name;

                var status = GetFirstStatus();                
                var dailyIndex = await _businessRepository.Order_GetNextOrderIndex();

                var order_toCreate = new OrderEntity()
                {
                    DailyIndex = dailyIndex,
                    UserId = userId,
                    PayingWith = request.PayingWith,
                    Comments = request.Comments,
                    DeliveryMethod = request.DeliveryMethod,
                    ShippingCost = request.ShippingCost,
                    TipPercent = request.TipPercent,
                    OrderElements = orderElements_toCreate,
                    OrderStatuses = status,
                    AddressJson = addressJson,
                    AddressName = addressName,
                    CreatedAt = status.FirstOrDefault()!.EventAt!.Value,
                    UpdatedAt = status.FirstOrDefault()!.EventAt!.Value,
                    Status = status.FirstOrDefault()!.Status,
                    ProductCount = orderElements_toCreate.Sum(p => p.ProductQuantity),
                    ProductTotal = orderElements_toCreate.Sum(p => p.ProductQuantity * p.ProductPrice),
                };

                var cartElementIds = request.CartElements.Select(p => p.CartElementId).ToList();
                await _businessRepository.Cart_CreateOrderAsync(userId, order_toCreate, cartElementIds);

                await _liveNotificationService.NotifyToEmployeesInformationAboutAnOrder(EnumRole.UserBoss.GetDescription(), "ORDER-CREATED", dailyIndex.ToString()!, null!, EnumOrderStatus.Received.GetDescription());

                _mySemaphore.OrderSemaphore.Release();
                
                // TODO: enviar correo a cliente y restaurante, despues de liberar

                return dailyIndex;
            }
            catch (Exception)
            {
                _mySemaphore.OrderSemaphore.Release();
                throw;
            }

        }

        private string GetUrl(string image)
        {
            if (string.IsNullOrEmpty(image))
            {
                return null!;
            }

            var url = FileUtility.GetUrlFile(_storageFile, image, CONTAINER_FILE);
            return url;
        }

        public async Task<List<int>> GetTipsAsync()
        {
            var values = await _businessRepository
                .Configuration_GetForOrders()
                .Where(p => p.Section == "ordenes" && p.Key == "listado-de-propinas-en-porcentaje")
                .Select(p => p.Value)
                .FirstOrDefaultAsync();

            return values!.Split(",").Select(int.Parse).ToList();            
        }

        public async Task<ShippingCostResponse> GetShippingCostAsync()
        {
            var value = await _businessRepository
                .Configuration_GetForOrders()
                .Where(p => p.Section == "ordenes" && p.Key == "costo-de-envío")
                .Select(p => p.Value)
                .FirstOrDefaultAsync();

            return new ShippingCostResponse()
            {
                Total = int.Parse(value!)
            };
        }
    }
}
