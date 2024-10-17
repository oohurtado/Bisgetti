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

        public async Task CustomerCreatedOrder(MessageHub messageHub)
        {            
            await Clients.All.SendAsync("NotifyToBossCustomerCreatedOrder", messageHub);            
        }
    }
}
