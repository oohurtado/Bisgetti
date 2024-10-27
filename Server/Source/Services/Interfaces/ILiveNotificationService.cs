using Server.Source.Models.Hubs;

namespace Server.Source.Services.Interfaces
{
    public interface ILiveNotificationService
    {
        Task NotifyToEmployeesInformationAboutAnOrder(MessageOrderHub messageOrderHub);
        Task NotifyToEmployeesInformationAboutAnOrder(string message, string extraData, string roleFrom, string roleTo, string userId, string statusFrom, string statusTo);
    }
}
