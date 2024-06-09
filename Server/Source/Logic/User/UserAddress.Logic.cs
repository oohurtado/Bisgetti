
using AutoMapper;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Server.Migrations;
using Server.Source.Data;
using Server.Source.Data.Interfaces;
using Server.Source.Exceptions;
using Server.Source.Models.DTOs.Common;
using Server.Source.Models.DTOs.User.Address;
using Server.Source.Models.DTOs.User.Common;
using Server.Source.Models.Entities;
using Server.Source.Models.Enums;
using System;
using System.Diagnostics;

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

        public async Task<PageResponse<AddressResponse>> GetAddressesListAsync(string userId)
        {
            var data = await _addressRepository.GetAddressesList(userId).ToListAsync();
            var result = _mapper.Map<List<AddressResponse>>(data);

            return new PageResponse<AddressResponse>
            {
                GrandTotal = result.Count,
                Data = result,
            };
        }

        public async Task<AddressResponse> GetAddressAsync(string userId, int id)
        {
            var data = await _addressRepository.GetAddress(userId, id).FirstOrDefaultAsync();

            if (data == null )
            {
                throw new EatSomeNotFoundErrorException(EnumResponseError.AddressNotFound);
            }

            var result = _mapper.Map<AddressResponse>(data);
            return result;
        }

        public async Task CreateAddressAsync(CreateOrUpdateAddressRequest request, string userId)
        {
            var exists = await _addressRepository.ExistsAsync(userId, id: null, request.Name!);
            if (exists)
            {
                throw new EatSomeNotFoundErrorException(EnumResponseError.AddressAlreadyExists);
            }

            var address = new AddressEntity()
            {
                UserId = userId,
            };
            _mapper.Map(request, address);
            await _addressRepository.CreateAddressAsync(address);

            await _addressRepository.ResetDefaultAsync(userId, address.Id);
        }

        public async Task UpdateAddressAsync(CreateOrUpdateAddressRequest request, string userId, int id)
        {
            var exists = await _addressRepository.ExistsAsync(userId, id: id, request.Name!);
            if (exists)
            {
                throw new EatSomeNotFoundErrorException(EnumResponseError.AddressAlreadyExists);
            }

            var address = await _addressRepository.GetAddress(userId, id).FirstOrDefaultAsync();
            if (address == null)
            {
                throw new EatSomeNotFoundErrorException(EnumResponseError.AddressNotFound);
            }
            _mapper.Map(request, address);
            await _addressRepository.UpdateAsync();

            await _addressRepository.ResetDefaultAsync(userId, id);
        }

        public async Task UpdateAddressDefaultAsync(UpdateAddressDefaultRequest request, string userId, int id)
        {
            var address = await _addressRepository.GetAddress(userId, id).FirstOrDefaultAsync();
            address!.IsDefault = request.IsDefault;            
            await _addressRepository.UpdateAsync();

            if (request.IsDefault)
            {
                await _addressRepository.ResetDefaultAsync(userId, id);
            }
        }

        public async Task DeleteAddressAsync(string userId, int id)
        {
            var address = await _addressRepository.GetAddress(userId, id).FirstOrDefaultAsync();
            await _addressRepository.DeleteAddressAsync(address!);            
        }
    }
}
