
using AutoMapper;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Server.Source.Data.Interfaces;
using Server.Source.Exceptions;
using Server.Source.Models.DTOs.Common;
using Server.Source.Models.DTOs.User.Address;
using Server.Source.Models.DTOs.User.Common;
using Server.Source.Models.Enums;
using System;

namespace Server.Source.Logic.User
{
    public class UserAddressLogic
    {
        private readonly IAddressRepository _addressRepository;
        private readonly IMapper _mapper;

        public UserAddressLogic(
            IAddressRepository addressRepository,
            IMapper mapper
            )
        {
            _addressRepository = addressRepository;
            _mapper = mapper;
        }

        public async Task<PageResponse<AddressResponse>> GetAddressListByPageAsync(string sortColumn, string sortOrder, int pageSize, int pageNumber, string? term)
        {
            var data = await _addressRepository.GetAddressesByPage(sortColumn, sortOrder, pageSize, pageNumber, term!, out int grandTotal).ToListAsync();
            var result = _mapper.Map<List<AddressResponse>>(data);

            return new PageResponse<AddressResponse>
            {
                GrandTotal = grandTotal,
                Data = result,
            };
        }

        public async Task<AddressResponse> GetAddressAsync(int id)
        {
            var data = await _addressRepository.GetAddress(id).FirstOrDefaultAsync();

            if (data == null )
            {
                throw new EatSomeNotFoundErrorException(EnumResponseError.AddressNotFound);
            }

            var result = _mapper.Map<AddressResponse>(data);
            return result;
        }
    }
}
