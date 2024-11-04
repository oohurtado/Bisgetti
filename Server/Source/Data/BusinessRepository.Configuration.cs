using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Server.Source.Data.Interfaces;
using Server.Source.Exceptions;
using Server.Source.Models.Entities;
using Server.Source.Models.Enums;
using System.Linq.Expressions;
using System.Net;

namespace Server.Source.Data
{
    public partial class BusinessRepository
    {
        public IQueryable<ConfigurationEntity> Configuration_GetForInformation()
        {
            return _context.Configurations.Where(p => p.Section == "información");            
        }

        public IQueryable<ConfigurationEntity> Configuration_GetForOrders()
        {
            return _context.Configurations.Where(p => p.Section == "ordenes");
        }
    }
}
