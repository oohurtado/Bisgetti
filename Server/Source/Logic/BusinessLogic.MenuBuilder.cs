
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Server.Source.Data.Interfaces;
using Server.Source.Exceptions;
using Server.Source.Models.DTOs.Business;
using Server.Source.Models.DTOs.Business.Category;
using Server.Source.Models.DTOs.Business.MenuBuilder;
using Server.Source.Models.DTOs.Common;
using Server.Source.Models.Entities;
using Server.Source.Models.Enums;

namespace Server.Source.Logic
{
    public class BusinessLogicMenuBuilder
    {
        private readonly IBusinessRepository _businessRepository;
        private readonly IMapper _mapper;

        public BusinessLogicMenuBuilder(
            IBusinessRepository businessRepository,
            IMapper mapper
            )
        {
            _businessRepository = businessRepository;
            _mapper = mapper;
        } 
    }
}
