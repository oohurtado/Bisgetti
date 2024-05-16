using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace Server.Source.Models.Enums
{
    public enum EnumRole
    {
        [Description("user-admin")]
        Admin,

        [Description("user-boss")]
        Boss,

        [Description("user-client")]
        Client
    }
}
