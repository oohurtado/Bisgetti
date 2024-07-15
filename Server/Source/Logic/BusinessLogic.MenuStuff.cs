
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Server.Source.Data.Interfaces;
using Server.Source.Exceptions;
using Server.Source.Extensions;
using Server.Source.Models.DTOs.Business.MenuStuff;
using Server.Source.Models.DTOs.Business.Product;
using Server.Source.Models.Entities;
using Server.Source.Models.Enums;
using System.Xml.Linq;

namespace Server.Source.Logic
{
    public class BusinessLogicMenuStuff
    {
        private readonly IBusinessRepository _businessRepository;
        private readonly IMapper _mapper;

        public BusinessLogicMenuStuff(
            IBusinessRepository businessRepository,
            IMapper mapper
            )
        {
            _businessRepository = businessRepository;
            _mapper = mapper;
        }

        public async Task<List<MenuStuffResponse>> GetMenuStuffAsync(int menuId)
        {
            var data = await _businessRepository.GetMenuStuff(menuId).ToListAsync();
            var result = _mapper.Map<List<MenuStuffResponse>>(data);
            return result;
        }

        public async Task AddElementAsync(ElementRequest request)
        {
            if (request.Action == EnumAddElement.CategoryToMenu.GetDescription())
            {
                if (request.MenuId == null || request.CategoryId == null)
                {
                    throw new EatSomeInternalErrorException(EnumResponseError.BusinessAddElement);
                }

                var position = await _businessRepository.GetPositionFromLastElementAsync(p => p.MenuId == request.MenuId && p.CategoryId != null && p.ProductId == null);

                var element = new MenuStuffEntity()
                {
                    MenuId = request.MenuId,
                    CategoryId = request.CategoryId,                    
                    IsVisible = true,
                    Position = position + 1,
                };

                await _businessRepository.AddElementAsync(element);
                return;
            }

            if (request.Action == EnumAddElement.ProductToCategory.GetDescription())
            {
                if (request.MenuId == null || request.CategoryId == null || request.ProductId == null)
                {
                    throw new EatSomeInternalErrorException(EnumResponseError.BusinessAddElement);
                }

                var position = await _businessRepository.GetPositionFromLastElementAsync(p => p.MenuId == request.MenuId && p.CategoryId == request.CategoryId && p.ProductId != null);

                var element = new MenuStuffEntity()
                {
                    MenuId = request.MenuId,
                    CategoryId = request.CategoryId,
                    ProductId = request.ProductId,
                    IsVisible = true,
                    IsAvailable = true,
                    IsSoldOut = false,                    
                    Position = position + 1,
                };

                await _businessRepository.AddElementAsync(element);
                return;
            }

            throw new EatSomeInternalErrorException(EnumResponseError.BusinessUnknownElement);
        }

        public async Task RemoveElementAsync(ElementRequest request)
        {
            if (request.Action == EnumRemoveElement.CategoryFromMenu.GetDescription())
            {
                if (request.MenuId == null || request.CategoryId == null)
                {
                    throw new EatSomeInternalErrorException(EnumResponseError.BusinessRemoveElement);
                }

                await _businessRepository.RemoveElementAsync(p => p.MenuId == request.MenuId && p.CategoryId == request.CategoryId);
                return;
            }

            if (request.Action == EnumRemoveElement.ProductFromCategory.GetDescription())
            {
                if (request.MenuId == null || request.CategoryId == null || request.ProductId == null)
                {
                    throw new EatSomeInternalErrorException(EnumResponseError.BusinessRemoveElement);
                }

                await _businessRepository.RemoveElementAsync(p => p.MenuId == request.MenuId && p.CategoryId == request.CategoryId && p.ProductId == request.ProductId);
                return;
            }

            throw new EatSomeInternalErrorException(EnumResponseError.BusinessUnknownElement);
        }
    }
}
