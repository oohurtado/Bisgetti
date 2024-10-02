using Microsoft.AspNetCore.SignalR;
using Server.Source.Data.Interfaces;
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

        public async Task MessageReceived(MessageHub messageHub)
        {
            var val = Context.UserIdentifier;

            // TODO: hub
            // 1 - buscar en users a traves de userId el correo
            // 2 - buscar todos los usuarios del restaurante
            // 3 - notificar via hub al restarante
        }
    }
}
