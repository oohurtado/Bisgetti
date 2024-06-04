using Server.Source.Extensions;
using Server.Source.Models.Enums;

namespace Server.Source.Exceptions
{
    public class EatSomeInternalErrorException : Exception
    {
        public EatSomeInternalErrorException(EnumResponseError enumResponseError)
            : base(enumResponseError.GetDescription())
        {
            
        }
    }
}
