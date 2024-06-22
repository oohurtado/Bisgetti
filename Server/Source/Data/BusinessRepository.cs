using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Server.Migrations;
using Server.Source.Data.Interfaces;
using Server.Source.Exceptions;
using Server.Source.Models.Entities;
using Server.Source.Models.Enums;
using System.Linq.Expressions;
using System.Net;

namespace Server.Source.Data
{
    public partial class BusinessRepository : IBusinessRepository
    {
        private readonly DatabaseContext _context;

        public BusinessRepository(DatabaseContext context)
        {
            _context = context;
        }

        public async Task UpdateAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
