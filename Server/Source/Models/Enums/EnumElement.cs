using System.ComponentModel;

namespace Server.Source.Models.Enums
{
    public enum EnumElementAction
    {
        [Description("add")]
        Add,

        [Description("remove")]
        Remove,

        [Description("move-up")]
        MoveUp,

        [Description("move-down")]
        MoveDown,
    }  
}
