﻿using Microsoft.AspNetCore.SignalR;
using Server.Source.Data.Interfaces;
using Server.Source.Extensions;
using Server.Source.Models.Enums;
using Server.Source.Models.Hubs;

namespace Server.Source.Hubs
{
    public class LiveNotificationHub : Hub
    {
        private readonly IAspNetRepository _aspNetRepository;

        public LiveNotificationHub(IAspNetRepository aspNetRepository)
        {
            _aspNetRepository = aspNetRepository;
        }

        //public async Task CustomerCreatedOrder(MessageOrderHub MessageOrderHub)
        //{            
        //    await Clients.All.SendAsync("NotifyToEmployeesThatOrderWasCreated", MessageOrderHub);            
        //}
    }
}