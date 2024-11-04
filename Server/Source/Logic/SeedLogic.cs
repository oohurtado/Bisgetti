using Server.Source.Data.Interfaces;
using Server.Source.Extensions;
using Server.Source.Models.Enums;

namespace Server.Source.Logic
{
    public class SeedLogic
    {
        private readonly IAspNetRepository _aspNetRepository;

        public SeedLogic(
            IAspNetRepository aspNetRepository
            )
        {
            _aspNetRepository = aspNetRepository;
        }

        public async Task InitAsync()
        {
            var appRoles = new List<string>();
            Enum.GetValues(typeof(EnumRole)).Cast<EnumRole>().ToList().ForEach(p =>
            {
                appRoles.Add(p.GetDescription());
            });

            await _aspNetRepository.CreateSystemRolesAsync(appRoles);
            await _aspNetRepository.DeleteSystemRolesAsync(appRoles);
        }
    }
}
