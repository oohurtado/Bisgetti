using Server.Source.Models.Hubs;

namespace Server.Source.Services.Interfaces
{
    public interface ILiveNotificationService
    {
        Task NotifyToEmployeesInformationAboutAnOrder(MessageOrderHub messageOrderHub);
        Task NotifyToEmployeesInformationAboutAnOrder(string groupName, string message, string extraData, string statusFrom, string statusTo);
    }
}
