
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Server.Source.Data;
using Server.Source.Data.Interfaces;
using Server.Source.Exceptions;
using Server.Source.Models.DTOs.Business;
using Server.Source.Models.DTOs.Business.Menu;
using Server.Source.Models.DTOs.Common;
using Server.Source.Models.Entities;
using Server.Source.Models.Enums;

namespace Server.Source.Logic
{
    public class BusinessLogicMenu
    {
        private readonly IBusinessRepository _businessRepository;
        private readonly IMapper _mapper;

        public BusinessLogicMenu(
            IBusinessRepository businessRepository,
            IMapper mapper
            )
        {
            _businessRepository = businessRepository;
            _mapper = mapper;
        }

        public async Task<PageResponse<MenuResponse>> GetMenusByPageAsync(string sortColumn, string sortOrder, int pageSize, int pageNumber, string? term)
        {
            var data = await _businessRepository.GetMenusByPage(sortColumn, sortOrder, pageSize, pageNumber, term!, out int grandTotal).ToListAsync();
            var result = _mapper.Map<List<MenuResponse>>(data);

            return new PageResponse<MenuResponse>
            {
                GrandTotal = result.Count,
                Data = result,
            };
        }

        public async Task<MenuResponse> GetMenuAsync(int id)
        {
            var data = await _businessRepository.GetMenu(id).FirstOrDefaultAsync();

            if (data == null)
            {
                throw new EatSomeNotFoundErrorException(EnumResponseError.MenuNotFound);
            }

            var result = _mapper.Map<MenuResponse>(data);
            return result;
        }

        public async Task CreateMenuAsync(CreateOrUpdateMenuRequest request)
        {
            var exists = await _businessRepository.ExistsMenuAsync(id: null, request.Name!);
            if (exists)
            {
                throw new EatSomeNotFoundErrorException(EnumResponseError.MenuAlreadyExists);
            }
     
            var menu = _mapper.Map<MenuEntity>(request);
            await _businessRepository.CreateMenuAsync(menu);
        }

        public async Task UpdateMenuAsync(CreateOrUpdateMenuRequest request, int id)
        {
            var exists = await _businessRepository.ExistsMenuAsync(id: id, request.Name!);
            if (exists)
            {
                throw new EatSomeNotFoundErrorException(EnumResponseError.MenuAlreadyExists);
            }

            var menu = await _businessRepository.GetMenu(id).FirstOrDefaultAsync();
            if (menu == null)
            {
                throw new EatSomeNotFoundErrorException(EnumResponseError.MenuNotFound);
            }
            _mapper.Map(request, menu);
            await _businessRepository.UpdateAsync();
        }

        public async Task DeleteMenuAsync(int id)
        {
            var menu = await _businessRepository.GetMenu(id).FirstOrDefaultAsync();

            if (menu == null)
            {
                throw new EatSomeNotFoundErrorException(EnumResponseError.MenuNotFound);
            }

            await _businessRepository.DeleteMenuAsync(menu!);
        }
    }
}
