using AutoMapper;
using Server.Source.Data.Interfaces;
using Server.Source.Exceptions;
using Server.Source.Models.DTOs.Common;
using Server.Source.Models.Entities;
using Server.Source.Models.Enums;
using Microsoft.EntityFrameworkCore;
using Microsoft.Data.SqlClient;
using Server.Source.Data;
using Server.Source.Services.Interfaces;
using Server.Source.Utilities;
using Server.Source.Models.DTOs.Entities;
using Server.Source.Models.DTOs.UseCases.Cart;
using Server.Source.Extensions;
using System.Text.Json;
using AutoMapper.Execution;
using Server.Source.Models.Hubs;
using Server.Source.Models.DTOs.UseCases.Configuration;

namespace Server.Source.Logic
{
    public class BusinessLogicConfiguration
    {
        private readonly IBusinessRepository _businessRepository;
        private readonly IMapper _mapper;

        public BusinessLogicConfiguration(
            IBusinessRepository businessRepository, 
            IMapper mapper)
        {
            _businessRepository = businessRepository;
            _mapper = mapper;
        }

        public async Task<UpdateInformationConfigurationResponse> GetConfigurationsForInformationAsync()
        {
            var data = await _businessRepository.Configuration_GetForInformation().ToListAsync();
            return new UpdateInformationConfigurationResponse()
            {
                Name = data.Where(p => p.Key == "nombre").Select(p => p.Value).FirstOrDefault(),
                Address = data.Where(p => p.Key == "dirección").Select(p => p.Value).FirstOrDefault(),
                Phone = data.Where(p => p.Key == "teléfono").Select(p => p.Value).FirstOrDefault(),
                OpeningDaysHours = data.Where(p => p.Key == "horario").Select(p => p.Value).FirstOrDefault()
            };
        }

        public async Task<UpdateOrderConfigurationResponse> GetConfigurationsForOrdersAsync()
        {
            var data = await _businessRepository.Configuration_GetForOrders().ToListAsync();
            return new UpdateOrderConfigurationResponse()
            {
                Tip = data.Where(p => p.Key == "propinas-en-porcentaje").Select(p => p.Value).FirstOrDefault(),
                Shipping = data.Where(p => p.Key == "costo-de-envío").Select(p => p.Value).FirstOrDefault(),
                Active = data.Where(p => p.Key == "tienda-en-linea").Select(p => p.Value).FirstOrDefault(),
            };
        }

        public async Task UpdateConfigurationsForInformationAsync(UpdateInformationConfigurationRequest request)
        {
            var data = await _businessRepository.Configuration_GetForInformation().ToListAsync();

            {
                var record = data.Where(p => p.Key == "nombre").FirstOrDefault();
                record!.Value = request.Name;
            }
            {
                var record = data.Where(p => p.Key == "dirección").FirstOrDefault();
                record!.Value = request.Address;
            }
            {
                var record = data.Where(p => p.Key == "teléfono").FirstOrDefault();
                record!.Value = request.Phone;
            }
            {
                var record = data.Where(p => p.Key == "horario").FirstOrDefault();
                record!.Value = request.OpeningDaysHours;
            }

            await _businessRepository.UpdateAsync();
        }

        public async Task UpdateConfigurationsForOrderAsync(UpdateOrderConfigurationRequest request)
        {
            var data = await _businessRepository.Configuration_GetForOrders().ToListAsync();

            {
                var record = data.Where(p => p.Key == "propinas").FirstOrDefault();
                record!.Value = request.Tip;
            }
            {
                var record = data.Where(p => p.Key == "envío").FirstOrDefault();
                record!.Value = request.Shipping;
            }
            {
                var record = data.Where(p => p.Key == "abierto").FirstOrDefault();
                record!.Value = request.Active;
            }

            await _businessRepository.UpdateAsync();
        }
    }
}
