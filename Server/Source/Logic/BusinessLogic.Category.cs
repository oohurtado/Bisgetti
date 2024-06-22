
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Server.Source.Data.Interfaces;
using Server.Source.Exceptions;
using Server.Source.Models.DTOs.Business.Category;
using Server.Source.Models.DTOs.Common;
using Server.Source.Models.Entities;
using Server.Source.Models.Enums;

namespace Server.Source.Logic
{
    public class BusinessLogicCategory
    {
        private readonly IBusinessRepository _businessRepository;
        private readonly IMapper _mapper;

        public BusinessLogicCategory(
            IBusinessRepository businessRepository,
            IMapper mapper
            )
        {
            _businessRepository = businessRepository;
            _mapper = mapper;
        }

        public async Task<PageResponse<CategoryResponse>> GetCategoriesByPageAsync(string sortColumn, string sortOrder, int pageSize, int pageNumber, string? term)
        {
            var data = await _businessRepository.GetCategoriesByPage(sortColumn, sortOrder, pageSize, pageNumber, term!, out int grandTotal).ToListAsync();
            var result = _mapper.Map<List<CategoryResponse>>(data);

            return new PageResponse<CategoryResponse>
            {
                GrandTotal = result.Count,
                Data = result,
            };
        }

        public async Task<CategoryResponse> GetCategoryAsync(int id)
        {
            var data = await _businessRepository.GetCategory(id).FirstOrDefaultAsync();

            if (data == null)
            {
                throw new EatSomeNotFoundErrorException(EnumResponseError.CategoryNotFound);
            }

            var result = _mapper.Map<CategoryResponse>(data);
            return result;
        }

        public async Task CreateCategoryAsync(CreateOrUpdateCategoryRequest request)
        {
            var exists = await _businessRepository.ExistsCategoryAsync(id: null, request.Name!);
            if (exists)
            {
                throw new EatSomeNotFoundErrorException(EnumResponseError.CategoryAlreadyExists);
            }

            var category = _mapper.Map<CategoryEntity>(request);
            await _businessRepository.CreateCategoryAsync(category);
        }

        public async Task UpdateCategoryAsync(CreateOrUpdateCategoryRequest request, int id)
        {
            var exists = await _businessRepository.ExistsCategoryAsync(id: id, request.Name!);
            if (exists)
            {
                throw new EatSomeNotFoundErrorException(EnumResponseError.CategoryAlreadyExists);
            }

            var category = await _businessRepository.GetCategory(id).FirstOrDefaultAsync();
            if (category == null)
            {
                throw new EatSomeNotFoundErrorException(EnumResponseError.CategoryNotFound);
            }

            _mapper.Map(request, category);
            await _businessRepository.UpdateAsync();
        }

        public async Task DeleteCategoryAsync(int id)
        {
            var category = await _businessRepository.GetCategory(id).FirstOrDefaultAsync();

            if (category == null)
            {
                throw new EatSomeNotFoundErrorException(EnumResponseError.CategoryNotFound);
            }

            await _businessRepository.DeleteCategoryAsync(category!);
        }
    }
}
