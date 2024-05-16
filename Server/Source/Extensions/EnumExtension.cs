using System.ComponentModel;
using System.Reflection;

namespace Server.Source.Extensions
{
    public static class EnumExtension
    {
        public static string GetDescription(this Enum enumValue)
        {
            return enumValue.GetType()
                            .GetMember(enumValue.ToString())
                            .First()
                            .GetCustomAttribute<DescriptionAttribute>()!
                            .Description;
        }
    }
}
