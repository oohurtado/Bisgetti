using Microsoft.AspNetCore.SignalR;
using Server.Source.Hubs;
using Server.Source.Models.Enums;
using Server.Source.Models.Hubs;
using Server.Source.Services.Interfaces;

namespace Server.Source.Services
{
    public class MassiveLiveNotificationService : ILiveNotificationService
    {
        private readonly IHubContext<MassiveLiveNotificationHub> _hub;

        public MassiveLiveNotificationService(IHubContext<MassiveLiveNotificationHub> hub)
        {
            _hub = hub;
        }

        public async Task NotifyToEmployeesInformationAboutAnOrder(MessageOrderHub messageOrderHub)
        {
            await _hub.Clients.All.SendAsync("NotifyToEmployeesInformationAboutAnOrder", messageOrderHub);
        }

        public async Task NotifyToEmployeesInformationAboutAnOrder(string message, string extraData, string userIdFrom, string userIdTo, string roleFrom, string roleTo, string statusFrom, string statusTo)
        {
            await _hub.Clients.All.SendAsync("NotifyToEmployeesInformationAboutAnOrder", new MessageOrderHub()
            {
                Message = message,
                ExtraData = extraData,
                //RoleFrom = roleFrom,
                //RoleTo = roleTo,
                StatusFrom = statusFrom,
                StatusTo = statusTo,
                //UserIdFrom = userIdFrom,
                //UserIdTo = userIdTo,
            });            
        }
    }
}
