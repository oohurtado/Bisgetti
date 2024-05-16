using Server.Source.Extensions;
using Server.Source.Models.Enums;

namespace Server.Source.Exceptions
{
    public class EatSomeException : Exception
    {
        public EatSomeException(EnumResponseError enumResponseError)
            : base(enumResponseError.GetDescription())
        {
            
        }
    }
}
