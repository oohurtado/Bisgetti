
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Server.Source.Data.Interfaces;
using Server.Source.Models.DTOs.Business.MenuStuff;
using Server.Source.Models.DTOs.Business.Product;

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

        public async Task AddElementAsync(AddElementRequest request)
        {
            // EnumAddElement
            throw new NotImplementedException();
        }

        public async Task RemoveElementAsync(RemoveElementRequest request)
        {
            // EnumRemoveElement
            throw new NotImplementedException();
        }
    }
}
