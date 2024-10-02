using Microsoft.AspNetCore.SignalR;
using Server.Source.Data.Interfaces;
using Server.Source.Extensions;
using Server.Source.Models.Enums;
using Server.Source.Models.Hubs;

namespace Server.Source.Hubs
{
    public class NotifyToRestaurantHub : Hub
    {
        private readonly IAspNetRepository _aspNetRepository;

        public NotifyToRestaurantHub(IAspNetRepository aspNetRepository)
        {
            _aspNetRepository = aspNetRepository;
        }

        public async Task NewOrderReceived(MessageHub messageHub)
        {
            var val = Context.UserIdentifier;

            var roleBoss = EnumRole.UserBoss.GetDescription();
            var users = await _aspNetRepository.GetUsersInRoleAsync(role: roleBoss);
            var userIds = users.Select(p => p.Id).ToList();
            await Clients.Users(userIds).SendAsync("NewOrderReceived", messageHub);
        }
    }
}
