using AutoMapper;
using Server.Source.Data.Interfaces;
using Server.Source.Exceptions;
using Server.Source.Models.DTOs.Common;
using Server.Source.Models.Entities;
using Server.Source.Models.Enums;
using Microsoft.EntityFrameworkCore;
using Microsoft.Data.SqlClient;
using Server.Source.Data;
using Server.Source.Models.DTOs.Cart;
using Server.Source.Services.Interfaces;
using Server.Source.Utilities;

namespace Server.Source.Logic
{
    public class BusinessLogicCart
    {
        private readonly IBusinessRepository _businessRepository;
        private readonly IMapper _mapper;
        private readonly IStorageFile _storageFile;

        private const string CONTAINER_FILE = "menu-images";

        public BusinessLogicCart(
            IBusinessRepository businessRepository,
            IMapper mapper,
            IStorageFile storageFile
            )
        {
            _businessRepository = businessRepository;
            _mapper = mapper;
            _storageFile = storageFile;
        }

        public async Task<List<PersonResponse>> GetPeopleAsync(string userId)
        {
            var people = await _businessRepository.GetPeople(userId)
                .Select(p => new PersonResponse()
                {
                    Name = p.Name,
                })
                .ToListAsync();
            

            return people;
        }

        public async Task<List<AddressResponse>> GetAddressesAsync(string userId)
        {
            var data = await _businessRepository.GetAddresses(userId).ToListAsync();
            var result = _mapper.Map<List<AddressResponse>>(data);
            return result;
        }

        public async Task AddProductToCartAsync(string userId, AddProductToCartRequest request)
        {
            var cartElement = await _businessRepository
                .GetProductsFromCart(userId)
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
                await _businessRepository.AddProductCartAsync(newCartElement);

                var exists = await _businessRepository.GetPeople(userId, p => p.Name == request.PersonName).AnyAsync();
                if (!exists)
                {
                    var person = new PersonEntity()
                    {
                        UserId = userId,
                        Name = request.PersonName,
                    };
                    await _businessRepository.AddPersonToUser(person);
                }
            }

        }

        public async Task UpdateProductFromCartAsync(string userId, UpdateProductFromCartRequest request)
        {
            var cartElement = await _businessRepository
                .GetProductsFromCart(userId)
                .Where(p => p.ProductId == request.ProductId && p.PersonName == request.PersonName)
                .FirstOrDefaultAsync();

            if (cartElement == null)
            {
                throw new EatSomeNotFoundErrorException(EnumResponseError.ProductNotFound);
            }

            cartElement.ProductQuantity = request.ProductQuantity;
            await _businessRepository.UpdateAsync();
        }

        public async Task<List<CartElementResponse>> GetProductsFromCartAsync(string userId)
        {
            var cartElements = await _businessRepository
                .GetProductsFromCart(userId)
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

            var menu = await _businessRepository.GetMenuStuff(p => p.MenuId != null && p.CategoryId == null && p.ProductId == null).FirstOrDefaultAsync();
            if (menu != null)
            {
                var productIds = cartElements.Select(p => p.ProductId).ToList();
                var productImages = await _businessRepository.GetMenuStuff(p => productIds.Contains(p.ProductId ?? 0)).Select(p => new { p.ProductId, p.Image }).ToListAsync();

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
                .GetProductsFromCart(userId)
                .Where(p => p.Id == id)
                .FirstOrDefaultAsync();

            if (cartElement != null)
            {
                await _businessRepository.DeleteProductFromCartAsync(cartElement);
            }
        }

        public async Task<NumberOfProductsInCartResponse> GetNumberOfProductsInCartAsync(string userId)
        {
            var total = await _businessRepository.GetNumberOfProductsInCartAsync(userId, p => true);
            return new NumberOfProductsInCartResponse()
            {
                Total = total
            };
        }

        public async Task<TotalOfProductsInCartResponse> GetTotalOfProductsInCartAsync(string userId)
        {
            var total = await _businessRepository.GetTotalOfProductsInCartAsync(userId, p => true);
            return new TotalOfProductsInCartResponse()
            {
                Total = total
            };
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
    }
}
