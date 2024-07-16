
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

        public async Task AddOrRemoveElementAsync(AddOrRemoveElementRequest request)
        {
            if (request.Action == EnumElementAction.Add.GetDescription())
            {
                await AddElementAsync(request);
                return;
            }
            else if (request.Action == EnumElementAction.Remove.GetDescription())
            {
                await RemoveElementAsync(request);
                return;
            }

            throw new NotImplementedException();
        }

        private async Task AddElementAsync(AddOrRemoveElementRequest request)
        {
            // agregando categoria a menu
            if (request.MenuId != null && request.CategoryId != null && request.ProductId == null)
            {
                var position = await _businessRepository.GetPositionFromLastElementAsync(p => p.MenuId == request.MenuId && p.CategoryId != null && p.ProductId == null);

                var element = new MenuStuffEntity()
                {
                    MenuId = request.MenuId,
                    CategoryId = request.CategoryId,                    
                    IsVisible = true,
                    Position = position + 1,
                };

                var any = await _businessRepository.ElementExistsAsync(p => p.MenuId == element.MenuId && p.CategoryId == element.CategoryId && p.ProductId == null);
                if (any)
                {
                    throw new EatSomeInternalErrorException(EnumResponseError.BusinessElementAlreadyExists);
                }

                await _businessRepository.AddElementAsync(element);
                return;
            }

            if (request.MenuId != null && request.CategoryId != null && request.ProductId != null)
            {
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

                var any = await _businessRepository.ElementExistsAsync(p => p.MenuId == element.MenuId && p.CategoryId == element.CategoryId && p.ProductId == element.ProductId);
                if (any)
                {
                    throw new EatSomeInternalErrorException(EnumResponseError.BusinessElementAlreadyExists);
                }

                await _businessRepository.AddElementAsync(element);
                return;
            }

            throw new EatSomeInternalErrorException(EnumResponseError.BusinessUnknownActionForElement);
        }

        private async Task RemoveElementAsync(AddOrRemoveElementRequest request)
        {
            if (request.MenuId != null && request.CategoryId != null && request.ProductId == null)
            {
                var any = await _businessRepository.ElementExistsAsync(p => p.MenuId == request.MenuId && p.CategoryId == request.CategoryId);
                if (!any)
                {
                    throw new EatSomeInternalErrorException(EnumResponseError.BusinessElementDoesNotExists);
                }

                await _businessRepository.RemoveElementAsync(p => p.MenuId == request.MenuId && p.CategoryId == request.CategoryId);
                return;
            }

            if (request.MenuId != null && request.CategoryId != null && request.ProductId != null)
            {
                var any = await _businessRepository.ElementExistsAsync(p => p.MenuId == request.MenuId && p.CategoryId == request.CategoryId && p.ProductId == request.ProductId);
                if (!any)
                {
                    throw new EatSomeInternalErrorException(EnumResponseError.BusinessElementDoesNotExists);
                }

                await _businessRepository.RemoveElementAsync(p => p.MenuId == request.MenuId && p.CategoryId == request.CategoryId && p.ProductId == request.ProductId);
                return;
            }

            throw new EatSomeInternalErrorException(EnumResponseError.BusinessUnknownActionForElement);
        }

        public async Task MoveElementAsync(MoveElementRequest request)
        {
            if (request.Action == EnumElementAction.MoveUp.GetDescription())
            {
                //await AddElementAsync(request);
                return;
            }
            else if (request.Action == EnumElementAction.MoveDown.GetDescription())
            {
                //await RemoveElementAsync(request);
                return;
            }

            throw new NotImplementedException();
        }
    }
}
