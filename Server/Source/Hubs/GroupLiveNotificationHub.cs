using Microsoft.AspNetCore.SignalR;
using Server.Source.Data.Interfaces;
using Server.Source.Extensions;
using Server.Source.Models.Enums;
using Server.Source.Models.Hubs;

namespace Server.Source.Hubs
{
    public class GroupLiveNotificationHub : Hub
    {
        public async Task JoinGroup(string groupName, string fullname)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);
        }

        public async Task LeaveGroup(string groupName, string fullname)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);
        }

        //public async Task SendMessage(MessageOrderHub message)
        //{
        //    await Clients.Group(message.GroupName!).SendAsync("NewMessage", message);
        //}
    }
}
