using Server.Source.Data;
using Server.Source.Extensions;
using Server.Source.Models.Enums;

namespace Server.Source.Logic
{
    public class SeedLogic
    {
        private readonly IAspNetRepository _aspNetRepository;

        public SeedLogic(IAspNetRepository aspNetRepository)
        {
            _aspNetRepository = aspNetRepository;
        }

        public async Task InitAsync()
        {
            var appRoles = new List<string>();
            Enum.GetValues(typeof(EnumRole)).Cast<EnumRole>().ToList().ForEach(p =>
            {
                appRoles.Add(p.Get_Description());
            });

            await _aspNetRepository.CreateRolesAsync(appRoles);
            await _aspNetRepository.DeleteRolesAsync(appRoles);
        }
    }
}
