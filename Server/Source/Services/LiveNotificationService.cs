using Microsoft.AspNetCore.SignalR;
using Server.Source.Hubs;
using Server.Source.Models.Enums;
using Server.Source.Models.Hubs;
using Server.Source.Services.Interfaces;

namespace Server.Source.Services
{
    public class LiveNotificationService : ILiveNotificationService
    {
        private readonly IHubContext<LiveNotificationHub> _hub;

        public LiveNotificationService(IHubContext<LiveNotificationHub> hub)
        {
            _hub = hub;
        }

        public async Task NotifyToEmployeesInformationAboutAnOrder(MessageOrderHub messageOrderHub)
        {
            await _hub.Clients.All.SendAsync("NotifyToEmployeesInformationAboutAnOrder", messageOrderHub);
        }

        public async Task NotifyToEmployeesInformationAboutAnOrder(string message, string extraData, string roleFrom, string roleTo, string userId, string statusFrom, string statusTo)
        {
            await _hub.Clients.All.SendAsync("NotifyToEmployeesInformationAboutAnOrder", new MessageOrderHub()
            {
                Message = message,
                ExtraData = extraData,
                RoleFrom = roleFrom,
                RoleTo = roleTo,
                StatusFrom = statusFrom,
                StatusTo = statusTo,
                UserId = userId,
            });            
        }
    }
}
