using Microsoft.AspNetCore.SignalR;
using Server.Source.Hubs;
using Server.Source.Models.Enums;
using Server.Source.Models.Hubs;
using Server.Source.Services.Interfaces;

namespace Server.Source.Services
{
    public class GroupLiveNotificationService : ILiveNotificationService
    {
        private readonly IHubContext<GroupLiveNotificationHub> _hub;

        public GroupLiveNotificationService(IHubContext<GroupLiveNotificationHub> hub)
        {
            _hub = hub;
        }

        public async Task NotifyToEmployeesInformationAboutAnOrder(MessageOrderHub messageOrderHub)
        {
            await _hub.Clients.All.SendAsync("NotifyToEmployeesInformationAboutAnOrder", messageOrderHub);
        }

        public async Task NotifyToEmployeesInformationAboutAnOrder(string groupName, string message, string extraData, string statusFrom, string statusTo)
        {
            await _hub.Clients.Group(groupName).SendAsync("NotifyToEmployeesInformationAboutAnOrder", new MessageOrderHub()
            {
                GroupName = groupName,
                Message = message,
                ExtraData = extraData,
                StatusFrom = statusFrom,
                StatusTo = statusTo,
            });
        }
    }
}
