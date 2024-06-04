using Server.Source.Extensions;
using Server.Source.Models.Enums;

namespace Server.Source.Exceptions
{
    public class EatSomeNotFoundErrorException : Exception
    {
        public EatSomeNotFoundErrorException(EnumResponseError enumResponseError)
            : base(enumResponseError.GetDescription())
        {

        }
    }   
}
