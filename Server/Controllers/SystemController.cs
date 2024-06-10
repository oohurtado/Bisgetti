using Microsoft.AspNetCore.Mvc;
using Server.Source.Models.Enums;
using Server.Source.Services.Interfaces;
using Server.Source.Utilities;
using static Server.Source.Services.EmailNotificationService;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SystemController : ControllerBase
    {
        [HttpGet(template: "datetime")]
        public async Task<ActionResult> Datetime()
        {
            return Ok(await Task.FromResult(new { DateTime.Now }));
        }

#if DEBUG
        [HttpGet(template: "test-appsetting-restaurant-information")]
        public async Task<ActionResult> TestAppSettingRestaurantInformation([FromServices] ConfigurationUtility configurationUtility)
        {
            await Task.Delay(1);
            var data = configurationUtility.GetRestaurantInformation();
            return Ok(data);
        }

        [HttpGet(template: "test-appsetting-email-notification")]
        public async Task<ActionResult> TestAppSettingEmailNotification([FromServices] ConfigurationUtility configurationUtility)
        {
            await Task.Delay(1);
            var data = configurationUtility.GetEmailNotification();
            return Ok(data);
        }

        [HttpGet(template: "test-email-welcome")]
        public async Task<ActionResult> TestEmailWelcome([FromServices] INotificationService notificationService, [FromServices] ConfigurationUtility configurationUtility)
        {
            var body = EmailUtility.LoadFile(EnumEmailTemplate.Welcome);
            var configuration = configurationUtility.GetRestaurantInformation();

            body = body.Replace("[user-first-name]", "Oscar");
            body = body.Replace("[restaurant-name]", configuration.Name);
            body = body.Replace("[restaurant-email]", configuration.Email);
            body = body.Replace("[restaurant-phone-number]", configuration.PhoneNumber);

            notificationService.SetMessage("Probando cuerpo html", body);
            notificationService.SetRecipient(email: "oohurtado@gmail.com", name: "Oscar Hurtado", RecipientType.Recipient);
            await notificationService.SendEmailAsync();
            return Ok();
        }
#endif
    }
}
