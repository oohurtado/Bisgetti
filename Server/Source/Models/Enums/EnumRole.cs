using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace Server.Source.Models.Enums
{
    public enum EnumRole
    {
        [Description("user-admin")]
        [Role(Level = 1)]
        UserAdmin,

        [Description("user-boss")]
        [Role(Level = 2)]
        UserBoss,

        [Description("user-customer")]
        [Role(Level = 3)]
        UserCustomer
    }

    public class RoleAttribute : Attribute
    {
        public int Level { get; set; }
    }
}
