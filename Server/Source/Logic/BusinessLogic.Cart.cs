using AutoMapper;
using Server.Source.Data.Interfaces;
using Server.Source.Exceptions;
using Server.Source.Models.DTOs.Business.Product;
using Server.Source.Models.DTOs.Business;
using Server.Source.Models.DTOs.Common;
using Server.Source.Models.Entities;
using Server.Source.Models.Enums;
using Microsoft.EntityFrameworkCore;
using Microsoft.Data.SqlClient;
using Server.Source.Models.DTOs.Business.Cart;

namespace Server.Source.Logic
{
    public class BusinessLogicCart
    {
        private readonly IBusinessRepository _businessRepository;
        private readonly IMapper _mapper;

        public BusinessLogicCart(
            IBusinessRepository businessRepository,
            IMapper mapper
            )
        {
            _businessRepository = businessRepository;
            _mapper = mapper;
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

        public async Task AddProductToCartAsync(string userId, AddProductToCartRequest request)
        {
            var cartElement = new CartElementEntity()
            {
                UserId = userId,
                PersonName = request.PersonName,
                ProductId = request.ProductId,
                ProductGuid = request.ProductGuid,
                ProductQuantity = request.ProductQuantity,
                ProductPrice = request.ProductPrice,
            };
            await _businessRepository.AddCartElementAsync(cartElement);

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

        public async Task<NumberOfProductsInCartResponse> GetNumberOfProductsInCartAsync(string userId)
        {
            var total = await _businessRepository.GetNumberOfProductsInCartAsync(userId, p => true);
            return new NumberOfProductsInCartResponse()
            {
                Total = total
            };
        }
    }
}
