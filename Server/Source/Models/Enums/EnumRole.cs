using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace Server.Source.Models.Enums
{
    public enum EnumRole
    {
        [Description("user-admin")]
        UserAdmin,

        [Description("user-boss")]
        UserBoss,

        [Description("user-client")]
        UserClient
    }
}
