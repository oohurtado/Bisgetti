using Server.Source.Extensions;
using Server.Source.Models.Enums;

namespace Server.Source.Utilities
{
    public static class EmailUtility
    {
        public static string LoadFile(EnumEmailTemplate enumEmailTemplate)
        {
            var listPath = new List<string>();
            listPath.Add(System.IO.Path.GetDirectoryName(System.Reflection.Assembly.GetExecutingAssembly().Location)!);
            listPath.AddRange(enumEmailTemplate.GetDescription().Split('/').ToList()!);
            var path = Path.Combine(listPath.ToArray());
            string body = System.IO.File.ReadAllText(path);
            return body;
        }
    }
}
