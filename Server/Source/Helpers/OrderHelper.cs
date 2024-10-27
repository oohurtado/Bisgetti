using Server.Source.Exceptions;
using Server.Source.Extensions;
using Server.Source.Models.Enums;

namespace Server.Source.Helpers
{
    public static class OrderHelper
    {
        public static EnumOrderStatus NextStep(string currentStatus, string deliveryMethod)
        {
            EnumOrderStatus? enumStatus = null;

            var values = Enum.GetValues(typeof(EnumOrderStatus));
            foreach (EnumOrderStatus value in values)
            {
                if (value.GetDescription() == currentStatus)
                {
                    enumStatus = value;
                    break;
                }
            }

            if (enumStatus == EnumOrderStatus.Delivered)
            {
                throw new EatSomeInternalErrorException(EnumResponseError.OrderWasDelivered);
            }

            if (deliveryMethod == EnumDeliveryMethod.TakeAway.GetDescription())
            {
                switch (enumStatus)
                {
                    case EnumOrderStatus.Received:
                        return EnumOrderStatus.Accepted;
                    case EnumOrderStatus.Accepted:
                        return EnumOrderStatus.Cooking;
                    case EnumOrderStatus.Cooking:
                        return EnumOrderStatus.Ready;
                    case EnumOrderStatus.Ready:
                        return EnumOrderStatus.Delivered;
                    default:
                        throw new EatSomeInternalErrorException(EnumResponseError.InternalServerError);
                }
            }

            if (deliveryMethod == EnumDeliveryMethod.ForDelivery.GetDescription())
            {
                switch(enumStatus)
                {
                    case EnumOrderStatus.Received:
                        return EnumOrderStatus.Accepted;
                    case EnumOrderStatus.Accepted:
                        return EnumOrderStatus.Cooking;
                    case EnumOrderStatus.Cooking:
                        return  EnumOrderStatus.Ready;
                    case EnumOrderStatus.Ready:
                        return EnumOrderStatus.OnTheRoad;
                    case EnumOrderStatus.OnTheRoad:
                        return EnumOrderStatus.Delivered;
                    default:
                        throw new EatSomeInternalErrorException(EnumResponseError.InternalServerError);
                }
            }           

            throw new EatSomeInternalErrorException(EnumResponseError.InternalServerError);
        }

        public static EnumOrderStatus Canceled(string currentStatus)
        {
            return EnumOrderStatus.Canceled;
        }

        internal static EnumOrderStatus Declined(string currentStatus)
        {
            return EnumOrderStatus.Declined;
        }
    }
}
