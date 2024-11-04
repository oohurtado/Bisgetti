using Microsoft.EntityFrameworkCore;
using Server.Source.Data.Interfaces;
using Server.Source.Models.Entities;

namespace Server.Source.Data
{
    public class ConfigurationRepository : IConfigurationRepository
    {
        private readonly DatabaseContext _context;

        public ConfigurationRepository(DatabaseContext context)
        {
            _context = context;
        }        
    }
}
