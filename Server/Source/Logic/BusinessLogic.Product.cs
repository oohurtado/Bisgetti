using AutoMapper;
using Server.Source.Data.Interfaces;
using Server.Source.Exceptions;
using Server.Source.Models.DTOs.Business.Product;
using Server.Source.Models.DTOs.Business;
using Server.Source.Models.DTOs.Common;
using Server.Source.Models.Entities;
using Server.Source.Models.Enums;
using Microsoft.EntityFrameworkCore;

namespace Server.Source.Logic
{
    public class BusinessLogicProduct
    {
        private readonly IBusinessRepository _businessRepository;
        private readonly IMapper _mapper;

        public BusinessLogicProduct(
            IBusinessRepository businessRepository,
            IMapper mapper
            )
        {
            _businessRepository = businessRepository;
            _mapper = mapper;
        }

        public async Task<PageResponse<ProductResponse>> GetProductsByPageAsync(string sortColumn, string sortOrder, int pageSize, int pageNumber, string? term)
        {
            var data = await _businessRepository.GetProductsByPage(sortColumn, sortOrder, pageSize, pageNumber, term!, out int grandTotal).ToListAsync();
            var result = _mapper.Map<List<ProductResponse>>(data);

            return new PageResponse<ProductResponse>
            {
                GrandTotal = result.Count,
                Data = result,
            };
        }

        public async Task<ProductResponse> GetProductAsync(int id)
        {
            var data = await _businessRepository.GetProduct(id).FirstOrDefaultAsync();

            if (data == null)
            {
                throw new EatSomeNotFoundErrorException(EnumResponseError.ProductNotFound);
            }

            var result = _mapper.Map<ProductResponse>(data);
            return result;
        }

        public async Task CreateProductAsync(CreateOrUpdateProductRequest request)
        {
            var exists = await _businessRepository.ExistsProductAsync(id: null, request.Name!);
            if (exists)
            {
                throw new EatSomeNotFoundErrorException(EnumResponseError.ProductAlreadyExists);
            }

            var product = _mapper.Map<ProductEntity>(request);
            await _businessRepository.CreateProductAsync(product);
        }

        public async Task UpdateProductAsync(CreateOrUpdateProductRequest request, int id)
        {
            var exists = await _businessRepository.ExistsProductAsync(id: id, request.Name!);
            if (exists)
            {
                throw new EatSomeNotFoundErrorException(EnumResponseError.ProductAlreadyExists);
            }

            var product = await _businessRepository.GetProduct(id).FirstOrDefaultAsync();
            if (product == null)
            {
                throw new EatSomeNotFoundErrorException(EnumResponseError.ProductNotFound);
            }
            _mapper.Map(request, product);
            await _businessRepository.UpdateAsync();
        }

        public async Task DeleteProductAsync(int id)
        {
            var product = await _businessRepository.GetProduct(id).FirstOrDefaultAsync();

            if (product == null)
            {
                throw new EatSomeNotFoundErrorException(EnumResponseError.ProductNotFound);
            }

            await _businessRepository.DeleteProductAsync(product!);
        }
    }
}
