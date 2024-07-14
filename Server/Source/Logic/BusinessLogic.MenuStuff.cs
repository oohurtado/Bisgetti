
using AutoMapper;
using Server.Source.Data.Interfaces;
using Server.Source.Models.DTOs.Business.MenuStuff;

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
            throw new NotImplementedException();
        }
    }
}
