
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Server.Source.Data;
using Server.Source.Data.Interfaces;
using Server.Source.Exceptions;
using Server.Source.Models.DTOs.Common;
using Server.Source.Models.DTOs.Entities;
using Server.Source.Models.DTOs.UseCases.Menu;
using Server.Source.Models.Entities;
using Server.Source.Models.Enums;
using Server.Source.Services.Interfaces;
using Server.Source.Utilities;
using System.Linq.Expressions;

namespace Server.Source.Logic
{
    public class BusinessLogicMenu
    {
        private readonly IBusinessRepository _businessRepository;
        private readonly IMapper _mapper;
        private readonly IStorageFile _storageFile;

        private const string CONTAINER_FILE = "menu-images";

        public BusinessLogicMenu(
            IBusinessRepository businessRepository,
            IStorageFile storageFile,
            IMapper mapper
            )
        {
            _businessRepository = businessRepository;
            _storageFile = storageFile;
            _mapper = mapper;
        }

        public async Task<PageResponse<MenuResponse>> GetMenusByPageAsync(string sortColumn, string sortOrder, int pageSize, int pageNumber, string? term)
        {
            var data = await _businessRepository
                .Menu_GetMenusByPage(sortColumn, sortOrder, pageSize, pageNumber, term!, out int grandTotal)
                .Select(p => new MenuResponse()
                {
                    Id = p.Id,
                    Name = p.Name,
                    Description = p.Description,
                    IsVisible = p.MenuStuff!.Where(q => q.CategoryId == null).FirstOrDefault()!.IsVisible,
                    IsAvailable = p.MenuStuff!.Where(q => q.CategoryId == null).FirstOrDefault()!.IsAvailable,
                })
                .ToListAsync();
            //var result = _mapper.Map<List<MenuResponse>>(data);

            return new PageResponse<MenuResponse>
            {
                GrandTotal = grandTotal,
                //Data = result,
                Data = data
            };
        }

        public async Task<MenuResponse> GetMenuAsync(int id)
        {
            var data = await _businessRepository.Menu_GetMenu(id).FirstOrDefaultAsync();

            if (data == null)
            {
                throw new EatSomeNotFoundErrorException(EnumResponseError.Menu_MenuNotFound);
            }

            var result = _mapper.Map<MenuResponse>(data);
            return result;
        }

        public async Task CreateMenuAsync(CreateOrUpdateMenuRequest request)
        {
            var exists = await _businessRepository.Menu_ExistsMenuAsync(id: null, request.Name!);
            if (exists)
            {
                throw new EatSomeNotFoundErrorException(EnumResponseError.Menu_MenuAlreadyExists);
            }
     
            var menu = _mapper.Map<MenuEntity>(request);
            await _businessRepository.Menu_CreateMenuAsync(menu);
        }

        public async Task UpdateMenuAsync(CreateOrUpdateMenuRequest request, int id)
        {
            var exists = await _businessRepository.Menu_ExistsMenuAsync(id: id, request.Name!);
            if (exists)
            {
                throw new EatSomeNotFoundErrorException(EnumResponseError.Menu_MenuAlreadyExists);
            }

            var menu = await _businessRepository.Menu_GetMenu(id).FirstOrDefaultAsync();
            if (menu == null)
            {
                throw new EatSomeNotFoundErrorException(EnumResponseError.Menu_MenuNotFound);
            }
            _mapper.Map(request, menu);
            await _businessRepository.UpdateAsync();
        }

        public async Task DeleteMenuAsync(int id)
        {
            var menu = await _businessRepository.Menu_GetMenu(id).FirstOrDefaultAsync();

            if (menu == null)
            {
                throw new EatSomeNotFoundErrorException(EnumResponseError.Menu_MenuNotFound);
            }

            Expression<Func<MenuStuffEntity, bool>> exp = p => p.MenuId == id;
            var elementsToDelete = await _businessRepository
                .MenuStuff_GetMenuStuff(exp)
                .ToListAsync();

            // borramos imagenes
            elementsToDelete
                .Where(p => !string.IsNullOrEmpty(p.Image))
                .Select(p => p.Image)
                .ToList()
                .ForEach(async p =>
                {
                    await FileUtility.DeleteAsync(_storageFile, p!, CONTAINER_FILE);
                });

            await _businessRepository.Menu_DeleteMenuAsync(menu!);
        }
    }
}
